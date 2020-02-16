import React from 'react';
import logo from './logo.svg';
import './App.css';

import {DragDropContext} from 'react-beautiful-dnd';

import CourseContext from './context';
import Status from './components/Status';
import Courses from './components/Courses';
import Semesters from './components/Semesters'
import Popup from './components/Popup'


const Provider = CourseContext.Provider;

const checkValid = RegExp(/^(Semester\s)\d,\s\d+/)


class App extends  React.Component  {
  constructor() {
    super()
    this.state = {
      coursesDict: {},
      semestersDict:{},
      status:[],
      canSelect:[],
      showPop:false,
    }
  }
  showRequirement() {
    this.setState({showPop:'requirement'})
  }
  showUsage() {
    this.setState({showPop:'usage'})
  }
  closePop() {
    this.setState({showPop: null})
  }
  updateRequirement(event){
    event.preventDefault()
    let newStatus = Array.from(this.state.status)
    for (let i = 0; i < newStatus.length; i++) {
      event.target.elements[i].value !== '' ? newStatus[i].required = event.target.elements[i].value : newStatus[i].required = '0';
    }
    this.setState({status:newStatus})
    this.closePop()
  }
  delect(info,semester) {

    let newCoursesPart = Array.from(this.state.coursesDict[info.type])
    newCoursesPart.push(info)
    const newCourses = {
      ...this.state.coursesDict,
      [info.type]: newCoursesPart
    }
    
    
    let newSemesterDictSem = Array.from(this.state.semestersDict[semester])
    let index = null
    for(let i=0;i < newSemesterDictSem.length;i++){
      if (newSemesterDictSem[i].code === info.code){
        index = i
      } 
    }
    newSemesterDictSem.splice(index,1)
    const newSemesterDict = {
      ...this.state.semestersDict,
      [semester]: newSemesterDictSem,
    }

    let newStatus = Array.from(this.state.status)
    for (let i = 0; i < newStatus.length; i++) {
      if (newStatus[i].part === info.type) {
        newStatus[i].obtained -= info.unit 
      }
    }

    this.setState({
      coursesDict:newCourses,
      semestersDict: newSemesterDict,
      status: newStatus
    })

  }
 

  componentDidMount() {
    let thisClass = this;
    fetch('http://localhost:5000/getCourses',{
        method:'GET',
        mode:'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(courses) {
        var coursesDict = {}, status = [];
        courses.forEach(element => {
            if (! Object.keys(coursesDict).includes(element.type)) {
                coursesDict[element.type] = [element]
                status.push({part:element.type,required:'?',obtained:0})
            } else {
                coursesDict[element.type].push(element)
            }
        })
        thisClass.setState({
            parts: Object.keys(coursesDict),
            coursesDict:coursesDict,
            semestersDict:{'2-2019':[],'1-2020':[],'2-2020':[],'1-2021':[]},
            semestersArray: Object.keys({'2-2019':[],'1-2020':[],'2-2020':[],'1-2021':[]}),
            status:status,
            showPop: null,
            showRequirement: thisClass.showRequirement.bind(thisClass),
            showUsage: thisClass.showUsage.bind(thisClass),
            closePop: thisClass.closePop.bind(thisClass),
            updateRequirement: thisClass.updateRequirement.bind(thisClass),
            delect:thisClass.delect.bind(thisClass)
        })
        console.log(thisClass.state)
        
    })

  }
  onDragStart = result => {
    const {source} = result;
    let course =  this.state.coursesDict[source.droppableId][source.index];
    let courseSem = course.semester.split(';');
    
    let availableParts = []
    //courseSem exp:["Semester 2, 2019", "Semester 1, 2020", "Semester 2, 2020"]
    courseSem.forEach((element)=>{
      if (element.match(checkValid)) {
        availableParts.push(element[9]+'-'+element.slice(12,16))
      } else {
        console.log(element+' is not valid semester format')
      }
    })
    this.setState({canSelect:availableParts})

  }
  onDragEnd = result => {
    const {destination, source} = result;

    if (! destination || destination.droppableId === source.droppableId) {
      this.setState({canSelect:[]})
      return;
    } 
    if (source.droppableId.includes(' ')) {
      const oldSemesters = this.state.semestersDict;
      const oldCourses = this.state.coursesDict;
      const status = this.state.status;
      
      const newSemesterInPart = Array.from(oldSemesters[destination.droppableId])
      const newCoursesInPart = Array.from(oldCourses[source.droppableId])
      newSemesterInPart.push(newCoursesInPart[source.index])//add to semester
      //add unit to status
      for (let i = 0; i < status.length; i++) {
        if (status[i].part === source.droppableId) {
          status[i].obtained += newCoursesInPart[source.index].unit 
        }
      }
      newCoursesInPart.splice(source.index,1)//remove it from courses
      
      const newSemesters = {
        ...oldSemesters,
        [destination.droppableId]:newSemesterInPart,
      }
      const newCourses = {
        ...oldCourses,
        [source.droppableId]:newCoursesInPart
      }
      
      this.setState({
        coursesDict:newCourses,
        semestersDict:newSemesters,
        status:status,
        canSelect:[],
      })
    }
    
  }


  render() {
    
    
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
        <Provider value={this.state}>
          
          {this.state.showPop != null ?
            <Popup poping={this.state.showPop}/>
            :null}

          <Status />
          <Semesters />
          <Courses/>
        </Provider>
      </DragDropContext>
      
    );
  }
}

export default App;
