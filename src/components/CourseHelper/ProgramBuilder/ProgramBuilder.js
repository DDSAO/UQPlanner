import React from 'react';
import Course from '../Course';
import styled from 'styled-components';
import PartButton from './PartButton';
import { Droppable } from 'react-beautiful-dnd';

const StyledDiv = styled.div`
    height: 50vh;
    width:auto;
    margin-left: 4em;
    margin-right: 4em;
    background-color: #8F6CAE;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 2px 3px #707070;
    overflow:auto;
    padding: 0em 1em;
`

const StyledButtonDiv = styled.div`
    height: 3em;
    padding-top: 1em;
    text-align: center;
    left: 50vw;
    width:auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #8F6CAE;

`

const StyledCoursesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    min-height: 100px;
`

const programBuilder = (props) => {

    const parts = props.allCourses.map(elm=>Object.keys(elm));
    const buttons = parts.map((elm,index) => 
    <PartButton buttonTitle={elm[0]} 
                changePart={props.changePart}
                currentPart={props.currentPart}
                key={'buttons'+index}/>);
    
    // //console.log(props.currentPart);
    //console.log(props.courses);

    // const getCourseList = () => {
    //     const selectedPart = props.currentPart;
    //     //console.log(props.coursesInfo)
    //     let coursesList = [...props.courses].map((elm)=> { 
    //     if(Object.keys(elm)[0] === selectedPart){
    //             return elm
    //         }});
    //     coursesList = coursesList.filter(elm=> typeof(elm) !== 'undefined')[0];
    //     return Object.values(coursesList)[0];
    // }

    // const coursesList = getCourseList();
    //console.log(props.selectedCourses)
    
    const courses = props.courses.map((elm, index)=>{
        return (<Course key={elm.code}
            code={elm.code} 
            name={elm.name}
            prereq={elm.prereq}
            semester={elm.semester}
            unit={elm.unit}
            index={index}
            selectedCourses={props.selectedCourses}
            totalUnitsSum={props.totalUnitsSum}/>)
        })

    return(
        <StyledDiv>
            <StyledButtonDiv>
                {buttons}
            </StyledButtonDiv>
            <Droppable 
                droppableId={props.currentPart}>
                {(provided)=>(
                    <StyledCoursesDiv
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                        {courses}
                        {provided.placeholder}
                    </StyledCoursesDiv>
                )}
            </Droppable>
        </StyledDiv>
    )  
}


export default programBuilder;

// const programBuilder = (props) => {

//     const parts = props.coursesInfo.map(elm=>Object.keys(elm));
//     const buttons = parts.map((elm,index) => 
//     <PartButton buttonTitle={elm[0]} 
//                 changePart={props.changePart}
//                 currentPart={props.currentPart}
//                 key={'buttons'+index}/>);
    
//     //console.log(props.currentPart);
//     //console.log(props.coursesInfo);

//     const getCourseList = () => {
//         const selectedPart = props.currentPart;
//         //console.log(props.coursesInfo)
//         let coursesList = [...props.coursesInfo].map((elm, index)=> { 
//         if(Object.keys(elm)[0] === selectedPart){
//                 return elm
//             }});
//         coursesList = coursesList.filter(elm=> typeof(elm) !== 'undefined')[0];
//         return Object.values(coursesList)[0];
//     }

//     const coursesList = getCourseList();
//     //console.log(coursesList);
        

//     const sortCourseList = (coursesList) => {
//         let sortedCourseslist = [];
//         let nonePrereq = [];
//         let onePrereq = [];
//         let morePrereq = [];
//         //console.log(coursesList);
//         coursesList.forEach(elm=>{
//             if(elm.prereq === 'None'){
//                 nonePrereq.push(elm);
//             }else if (elm.prereq.search('and') === -1){
//                 onePrereq.push(elm);
//             }else{
//                 morePrereq.push(elm);
//             }});
//         sortedCourseslist=nonePrereq.concat(onePrereq).concat(morePrereq);
//         //console.log(sortedCourseslist)
//         return sortedCourseslist
//     };

//     const sortedCoursesList = sortCourseList(coursesList);
//     //console.log(sortedCoursesList);

//     const courses = sortedCoursesList.map((elm, index)=>
//         (<Course key={elm.code}
//             code={elm.code} 
//             name={elm.name}
//             prereq={elm.prereq}
//             semester={elm.semester}
//             unit={elm.unit}
//             index={index}/>)
//         )

//     return(
//         <StyledDiv>
//             <StyledButtonDiv>
//                 {buttons}
//             </StyledButtonDiv>
//             <Droppable droppableId={props.currentPart}>
//                 {(provided)=>(
//                     <StyledCoursesDiv
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}>
//                         {courses}
//                         {provided.placeholder}
//                     </StyledCoursesDiv>
//                 )}
//             </Droppable>
//         </StyledDiv>
//     )  
// }


// export default programBuilder;