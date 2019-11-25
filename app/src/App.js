import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {DragDropContext} from 'react-beautiful-dnd';

import CourseContext from './context';
import Status from './components/Status';
import Courses from './components/Courses';
import CoursesWithInfo from './components/CoursesWithInfo'
import Semesters from './components/Semesters'


const Provider = CourseContext.Provider;


class App extends  React.Component  {
  constructor() {
    super()
    this.state = {
      coursesDict: {},
      semestersDict:{},
    }
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
        var coursesDict = {}
        courses.forEach(element => {

            if (! Object.keys(coursesDict).includes(element.type)) {
                coursesDict[element.type] = [element]
            } else {
                coursesDict[element.type].push(element)
            }
            
        })
        thisClass.setState({
            parts: Object.keys(coursesDict),
            coursesDict:coursesDict,
            semestersDict:{'1-2020':[],'2-2020':[],'1-2021':[],'2-2021':[]},
            semestersArray: Object.keys({'1-2020':{},'2-2020':{},'1-2021':{},'2-2021':{}})
        })
        
        
    })

  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if (! destination || destination.droppableId === source.droppableId) {
      return;
    } 
    const oldSemesters = this.state.semestersDict;
    const oldCourses = this.state.coursesDict;
    
    const newSemesterInPart = Array.from(oldSemesters[destination.droppableId])
    const newCoursesInPart = Array.from(oldCourses[source.droppableId])
    newSemesterInPart.push(newCoursesInPart[source.index])//add to semester
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
    })
    
    
   
  }


  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Provider value={this.state}>
          <Status />
          <Semesters />
          <Courses/>
        </Provider>
      </DragDropContext>
      
    );
  }
}

export default App;
