import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import ProgramBuilder from '../../components/CourseHelper/ProgramBuilder/ProgramBuilder';
import ProgramPreview from '../../components/ProgramPreview/ProgramPreview';
import { DragDropContext } from 'react-beautiful-dnd';
import Toolbar from '../../components/Toolbar/Toolbar';
import { Route, Link } from 'react-router-dom';

class StudyPlan extends Component {

    setCurrentSemester = () => {
        let currentSemester = null;
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth() + 1;
        const todayYear = todayDate.getFullYear();
        if (1 <= todayMonth <= 7) {
          currentSemester = 'S1'+' '+todayYear
        }else{
          currentSemester = 'S2'+' '+todayYear           
        };
        return currentSemester;
      };
      
    state = {
    startingSemester: this.setCurrentSemester(),
    totalUnits : {
        'Part A' : 0,
        'Part B' : 0,
        'Part C' : 0,
        'Part D' : 0
    },
    maxUnits : {
        'Part A' : [16],
        'Part B' : [6,8],
        'Part C' : [6,8,10],
        'Part D' : [0,2,4],
    },
    selectedMaxUnits : {
        'Part A' : 16,
        'Part B' : 0,
        'Part C' : 0,
        'Part D' : 0,
    },
    courses : [
        {'Part A' : null},
        {'Part B' : null},
        {'Part C' : null},
        {'Part D' : null},
    ], 
    selectedCourses: [
        [],
        [],
        [],
        []
    ],
    activePart: 'Part A',
    activeCourseList : [],
    loaded: false,
    draggedCourseSemester : null,
    initialCourses: null,
    totalUnitsSum: 0,
    totalMaxUnitsLimit : 32
    }
    
    componentDidMount() {
    //axios.get('https://uq-it-coursehelper.firebaseio.com/course/-M0UrYtdpy6F-lzVdlAf.json')
    axios.get('https://uq-it-coursehelper.firebaseio.com/course/-M0UrYtdpy6F-lzVdlAf.json')
        .then(response => {
        //axios.post('https://uq-it-coursehelper.firebaseio.com/course.json', response.data)
            let partACourses = [];
            let partBCourses = [];
            let partCCourses = [];
            let partDCourses = [];
            response.data.map(elm=>{
            elm.prereq = elm.prereq.replace(";\\n", '; ');
            elm.prereq = elm.prereq.replace("\\n", '; ');
            elm.prereq = elm.prereq.replace("\[", '( ');
            elm.prereq = elm.prereq.replace("\]", ' ) ');
            if (elm.type==='Part A'){
                partACourses.push(elm)
            }
            if (elm.type==='Part B'){
                partBCourses.push(elm)
            }
            if (elm.type==='Part C'){
                partCCourses.push(elm)
            }
            if (elm.type==='Part D'){
                partDCourses.push(elm)
            }
            });
    
            const coursesInfo = [
            {'Part A' : partACourses},
            {'Part B' : partBCourses},
            {'Part C' : partCCourses},
            {'Part D' : partDCourses},
            ];

            const coursesInfoCopy = JSON.parse(JSON.stringify(coursesInfo));

            this.setState({
            courses : this.sortCourseList(coursesInfo),
            initialCourses : this.sortCourseList(coursesInfoCopy),
            loaded : true
            })

            console.log('test')
        })
    }
    
    sortCourseList = (coursesInfo) => {
    let nonePrereq = [];
    let onePrereq = [];
    let morePrereq = [];

    coursesInfo.forEach(part => {       
        Object.values(part)[0].forEach(elm=>{                  
            if(elm.prereq === 'None'){               
                nonePrereq.push(elm);
            }else if (elm.prereq.search('and') === -1){
                onePrereq.push(elm);
            }else{
                morePrereq.push(elm);
            }});
            
            let sortedCourseslist = nonePrereq.concat(onePrereq).concat(morePrereq);
            
            let partKey = Object.keys(part)[0];
            part[partKey] = sortedCourseslist;
            part[partKey].forEach(elm => {
            elm.orderIndex = sortedCourseslist.indexOf(elm)+1;
            })
            //console.log(part[partKey]);
            if (partKey === this.state.activePart){
            this.setState({activeCourseList : sortedCourseslist})
            }
            sortedCourseslist = [];
            nonePrereq = [];
            onePrereq = [];
            morePrereq = [];
    })

    return coursesInfo;
    }

    changeSemester = (event) => {
    const startingSemester = event.target.value;
    let activeCourseList = null;
    this.state.initialCourses.forEach(part => {
        if (Object.keys(part)[0] === this.state.activePart){
        activeCourseList = Object.values(part)[0]
        }
    })
    this.setState({
        selectedCourses: [
        [],
        [],
        [],
        []
        ],
        courses : JSON.parse(JSON.stringify(this.state.initialCourses)),
        totalUnits : {
        'Part A' : 0,
        'Part B' : 0,
        'Part C' : 0,
        'Part D' : 0
        },
        startingSemester : startingSemester,
        activeCourseList : [...activeCourseList]
    })
    //console.log(this.state.startingSemester)
    }

    changePartHandler = selectedButton => {
    let coursesList = [...this.state.courses].map((elm)=> { 
        if(Object.keys(elm)[0] === selectedButton){
                return elm
            }});
        coursesList = coursesList.filter(elm=> typeof(elm) !== 'undefined')[0];
        coursesList = Object.values(coursesList)[0];

    this.setState({
        activePart:selectedButton,
        activeCourseList: coursesList
        });
    }

    changeMaxUnit = event => {
    const maxUnitsInfo = event.target.value;
    const part = maxUnitsInfo.split(':')[0];
    const units = parseInt(maxUnitsInfo.split(':')[1]);
    let selectedMaxUnits = JSON.parse(JSON.stringify(this.state.selectedMaxUnits));
    selectedMaxUnits[part] = units;
    let totalMaxUnitsSum = Object.values(selectedMaxUnits).reduce((a,b)=>a+b);
    this.setState({
        selectedMaxUnits : selectedMaxUnits
    })
    if (totalMaxUnitsSum > this.state.totalMaxUnitsLimit){
        alert("Total units can't exceed 32 units!")
    }
    //console.log(totalMaxUnitsSum)
    }

    onDragEnd = result => {
    const {destination, source, draggableId } = result;
    let totalUnits = {...this.state.totalUnits};
    this.setState({
        draggedCourseSemester: null,
    })

    if (!destination) {
        return 
    }

    if (destination.droppableId === source.droppableId){
        return 
    }

    // Drag course from builder to preview 
    // Reset the builder course list
    if (source.droppableId.length > 3) {
        let newCourseList = [...this.state.activeCourseList];
        newCourseList.splice(source.index, 1);
        let newCourses = [...this.state.courses];
        newCourses.forEach(part => {
        if (Object.keys(part)[0] === source.droppableId){
            part[source.droppableId] = newCourseList;
        };
        });
        //console.log(this.state.initialCourses)
        this.setState({
        activeCourseList:newCourseList,
        courses: newCourses
        })
        // Reset the preview course list
        const newSemesterList = [...this.state.selectedCourses];
        let totalUnitsSum = 0;
        this.state.activeCourseList.forEach(course => 
        {if(Object.values(course)[0] === draggableId){
            let index = destination.droppableId;
            newSemesterList[index].push(course)
            totalUnits[source.droppableId] = totalUnits[source.droppableId] + course.unit
            totalUnitsSum = Object.values(totalUnits).reduce((a,b)=>a+b)
        }});
        
        this.setState({
        selectedCourses:newSemesterList,
        totalUnits : totalUnits,
        totalUnitsSum : totalUnitsSum})
    }else if (source.droppableId.length < 3){
    //Drag the course from preview section 
        // Get dragged course
        const newSemesterList = [...this.state.selectedCourses];
        let draggedCourse = null;
        newSemesterList[source.droppableId].forEach(course => {
        if(course.code === draggableId){
            draggedCourse = course;
        }});
        //console.log(draggedCourse)
    //Drag the course to another preview section
        // Remove the dragged course from the old preview section
        if (destination.droppableId.length < 3){
        if (newSemesterList[source.droppableId].length === 1){
            newSemesterList[source.droppableId] = [];
        }else{
            newSemesterList[source.droppableId].splice(source.index, 1);
        }
        // Add the dragged course to the new preview section   
        let index = destination.droppableId;
        newSemesterList[index].push(draggedCourse)
        this.setState({selectedCourses : newSemesterList});
        }else if ((destination.droppableId.length > 3)){
    // Drag the course from preview to builder
        // Remove the dragged course from the old preview section
        if (newSemesterList[source.droppableId].length === 1){
            newSemesterList[source.droppableId] = [];
        }else{
            newSemesterList[source.droppableId].splice(source.index, 1);
        }
        this.setState({selectedCourses:newSemesterList});
        // Add the dragged course to the builder and sort courses in the builder section
        let newCourses = [...this.state.courses];
        let sortedOrderIndex = []
        let sortedNewCourses = [];
        newCourses.forEach(part => {
            if (Object.keys(part)[0] === draggedCourse.type){           
            part[draggedCourse.type].push(draggedCourse);
            part[draggedCourse.type].forEach(course => {
                sortedOrderIndex.push(course .orderIndex);
                sortedOrderIndex.sort();
            })
            sortedOrderIndex.forEach(index => {
                part[draggedCourse.type].forEach(course => {
                if (course.orderIndex === index){
                    sortedNewCourses.push(course);
                }
                })
            });
            part[draggedCourse.type] = (sortedNewCourses)          
            };
        });
        totalUnits[draggedCourse.type] = totalUnits[draggedCourse.type] - draggedCourse.unit
        const totalUnitsSum = Object.values(totalUnits).reduce((a,b)=>a+b)
        
        this.setState({
            courses: newCourses,
            totalUnits : totalUnits,
            totalUnitsSum : totalUnitsSum
        })

        if (this.state.activePart === draggedCourse.type){
            this.setState({
            activeCourseList: sortedNewCourses,
            })
        }        
        }
    }
    };

    onDragStart = result => {
    const {destination, source, draggableId } = result;  
    let draggedCourse = null;
    if (source.droppableId.length > 3) {
        this.state.activeCourseList.forEach(course => 
        {if(Object.values(course)[0] === draggableId){
            draggedCourse = course;
        }
        })
    }else if(source.droppableId.length < 3) {
        const newSemesterList = [...this.state.selectedCourses];
        newSemesterList[source.droppableId].forEach(course => {
        if(course.code === draggableId){
            draggedCourse = course;
        }});
    }
    
    draggedCourse = draggedCourse.semester.split(';');
    console.log(draggedCourse)
    this.setState({
        draggedCourseSemester: draggedCourse
    })
    }

    

    render() {
    if (this.state.loaded){
        return (
            <Aux>
                <Toolbar 
                    units={this.state.totalUnits}
                    maxUnits={this.state.maxUnits}
                    changeSemester={this.changeSemester}
                    changeMaxUnit={this.changeMaxUnit}/>

                <DragDropContext
                    onDragEnd={this.onDragEnd}
                    onDragStart={this.onDragStart}
                    >
                    <ProgramPreview startingSemester={this.state.startingSemester}
                                    selectedCourses={this.state.selectedCourses}
                                    draggedCourseSemester={this.state.draggedCourseSemester}/>
                    <ProgramBuilder courses={this.state.activeCourseList} 
                                    allCourses={this.state.courses}
                                    changePart={this.changePartHandler}
                                    currentPart={this.state.activePart}
                                    selectedCourses={this.state.selectedCourses}
                                    totalUnitsSum={this.state.totalUnitsSum}/>
                </DragDropContext>

                <Link
                    to='/feedback'
                    exact
                    style={{
                        textDecoration: 'none',
                        color: '#707070',
                        textAlign:'center',
                        fontWeight:'bold'
                    }}>
                    <p style={{marginTop:'10px'}}>Give Your Feedback</p>
                </Link>
            </Aux>
        )
    }else{
        return (
          null
        )
    }
    }
}

export default StudyPlan;
