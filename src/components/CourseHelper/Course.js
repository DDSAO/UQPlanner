import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledCourseDiv = styled.div`
    background-color: #F5F5F5;
    box-shadow: 0px 2px 3px #707070;
    margin: 10px;
    padding: 10px;
    font-size: 14px;
    flex-basis:22%;
    border-radius: 2px;
    border: none;
    text-align: left;
`

const StyledHandel = styled.div`
    width: 15px;
    height: 15px;
    background-color: ${props => props.isEligible ? '#51247A' : '#F5F5F5' };
    border: 2px solid #8F6CAE;
    border-radius: 4px;
    display: inline-block;
    margin-right: 0.5em;
`

const StyledPrereqDiv = styled.div`
    display: flex;
    align-items: center;
`

const course = (props) => {

    const semesters = [];
    if (props.semester.search('Semester 1') !== -1 ){
        semesters.push('Semester 1');
    }

    if (props.semester.search('Semester 2') !== -1 ){
        semesters.push('Semester 2');
    }

    let isEligible = false;

    // const isUpperCase = (str) => {
    //     return str === str.toUpperCase();
    // }

    const checkPrereq = (selectedCourses, prereq) => {
        let selectedCoursesArray = [];
        selectedCourses.forEach(semester => {
            semester.forEach(course => {
                selectedCoursesArray.push(course.code);
            })
        })
        selectedCoursesArray.forEach(course => {
            if (prereq === course){      
                isEligible = true;
            }else if (!prereq.includes('and') && prereq.includes(course)){
                isEligible = true;
            }else if (!prereq.includes('or') && prereq.includes('and')) {
                const prereqList = prereq.split('and');
                const numberOfPrereq = prereqList.length;
                let numberOfSelectedPrereq = 0;
                prereqList.forEach(prereqCourse => {
                    if (selectedCoursesArray.includes(prereqCourse.trim())){
                        numberOfSelectedPrereq = numberOfSelectedPrereq + 1
                    }
                })
                if (numberOfPrereq === numberOfSelectedPrereq){               
                    isEligible = true;
                }
            }else if(prereq.includes('or') && prereq.includes('and') && prereq.includes('(') ){
                let index = prereq.indexOf('(');
                const criteriaOne = prereq.slice(0, index).trim();
                const criteriaTwo = prereq.slice(index+1, -1).trim();
                console.log(criteriaOne);
                console.log(criteriaTwo);
                if (criteriaOne.includes('and') && criteriaTwo.includes('or')){
                    const criteriaOnePrereqList = criteriaOne.split('and');
                    //console.log(criteriaOnePrereqList);
                    const numberOfPrereq = criteriaOnePrereqList.length;
                    let numberOfSelectedPrereq = 0;
                    criteriaOnePrereqList.forEach(prereqCourse => {
                        if (selectedCoursesArray.includes(prereqCourse.trim())){
                            numberOfSelectedPrereq = numberOfSelectedPrereq + 1;
                            //console.log(numberOfPrereq);
                            //console.log(numberOfSelectedPrereq);
                        }
                    })
                    if (criteriaTwo.includes(course)){
                        numberOfSelectedPrereq = numberOfSelectedPrereq + 1;
                        //console.log(numberOfSelectedPrereq);
                    }
                    if (numberOfPrereq === numberOfSelectedPrereq){               
                        isEligible = true;
                    }
                }else if(criteriaOne.includes('or') && criteriaTwo.includes('and')){
                    if(criteriaOne.includes(course)){
                        isEligible = true;
                    }else{
                        const criteriaTwoPrereqList = criteriaTwo.split('and');
                        // console.log(criteriaTwoPrereqList);
                        const numberOfPrereq = criteriaTwoPrereqList.length;
                        let numberOfSelectedPrereq = 0;
                        criteriaTwoPrereqList.forEach(prereqCourse => {
                            if (selectedCoursesArray.includes(prereqCourse.trim())){
                                numberOfSelectedPrereq = numberOfSelectedPrereq + 1;
                                // console.log(numberOfPrereq);
                                // console.log(numberOfSelectedPrereq);
                            }
                        })
                        if (numberOfPrereq === numberOfSelectedPrereq){               
                            isEligible = true;
                        }
                    }
                }
    }
    })
    }

    if (props.prereq === 'None'){
        isEligible = true;
    }
    
    if (props.prereq.includes('units')){
        const index = props.prereq.indexOf('#');
        const units = props.prereq.slice(index+1, index+3)
        //console.log(index)
        if (props.totalUnitsSum >= units){
            isEligible = true;
        }else{
            isEligible = false;
        }
    }

    // if (props.prereq.includes('For') && props.prereq.includes(props.code)){
    //     let index = props.prereq.indexOf(props.code);
    //     let prereqInfo = props.prereq.slice(index);
    //     //console.log(prereqInfo)
    //     index =  prereqInfo.indexOf('prereq');
    //     prereqInfo = prereqInfo.slice(index);
    //     //console.log(prereqInfo)
    //     for (let i in prereqInfo){
    //         if (isUpperCase(prereqInfo[i])){
    //             index = i;
    //             break;
    //         }
    //     }
    //     prereqInfo = prereqInfo.slice(index);
    //     checkPrereq(props.selectedCourses, prereqInfo)
    //     //console.log(prereqInfo)
    // }

    checkPrereq(props.selectedCourses, props.prereq);

    return (
        <Draggable draggableId={props.code} index={props.index}>
            {(provided)=>(
                <StyledCourseDiv 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                        <p style={{fontWeight:'bold'}}>{props.code} {props.name}</p>
                        <pre>Unit: {props.unit}  Available: {semesters.join(', ')}</pre>
                        <StyledPrereqDiv>
                            <StyledHandel isEligible={isEligible}/> 
                            <p>Pre-requisite: {props.prereq}</p>
                        </StyledPrereqDiv>
                </StyledCourseDiv>
            )}
        </Draggable>
    )

}

export default course;