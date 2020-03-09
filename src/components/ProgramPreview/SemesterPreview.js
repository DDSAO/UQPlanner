import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import CourseSummary from '../CourseHelper/CourseSummary';

const StyledDiv = styled.div`
    text-align: center;
    background-color: #F5F5F5;
    width: 24%;
    border-radius: 5px;
    box-shadow: 0px 2px 3px #707070;
    border: ${props => props.isDropDisabled ?'5px solid #F5F5F5' : '5px solid #8F6CAE'} ;
    box-sizing: border-box;
`

const StyledTitleDiv = styled.div`
    margin-top:1em;
    color: '#707070';
    font-weight: bold;
`

const StyledCourseDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height:70%;
`

const semesterPreview = (props) => {

    const previewSection = props.semester + ', ' + props.year;
    let isDropDisabled = true;
    if (props.draggedCourseSemester !== null) {        
        isDropDisabled = !props.draggedCourseSemester.includes(previewSection)
        //console.log(isDropDisabled)
    }else{
        isDropDisabled = true;
        //console.log(isDropDisabled)
    }

    if (props.selectedCourses[props.index].length >= 4){
        isDropDisabled = true;
    };

    return (
        <Droppable 
            droppableId={props.id}
            isDropDisabled={isDropDisabled}>
            {(provided)=> (
                <StyledDiv isDropDisabled={isDropDisabled}>
                <StyledTitleDiv isDropDisabled={isDropDisabled}>
                    <p>{props.semester}</p>
                    <p>{props.year}</p>
                </StyledTitleDiv>
                <StyledCourseDiv 
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {props.selectedCourses[props.index].map((course,index) => <CourseSummary 
                            key={course.code}
                            code={course.code} 
                            name={course.name}
                            semester={course.semester}
                            index={index}/>)
                    }
                    {provided.placeholder}
                </StyledCourseDiv>
            </StyledDiv>
            )}
        </Droppable>
    )}

export default semesterPreview;