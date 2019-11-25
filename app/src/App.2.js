import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';



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
      semestersDict:{}
    }
  }

  componentDidMount() {
    let thisClass = this
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
                semestersDict:{'1-2020':{},'2-2020':{},'1-2021':{},'2-2021':{}}
            })
            console.log(coursesDict)
            
        })
  }
  onDragEnd(result) {

  }
  render() {

    return (
        <Provider value={this.state}>
          <Status />
          <Semesters />
          <CoursesWithInfo/>
        </Provider>

      
    );
  }
}

export default App;
