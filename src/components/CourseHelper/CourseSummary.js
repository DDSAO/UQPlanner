import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledCourseDiv = styled.div`
    background-color: #F5F5F5;
    box-shadow: 0px 2px 3px #707070;
    margin: 5px;
    padding: 10px;
    font-size: 14px;
    flex-basis:22%;
    border-radius: 2px;
    border: none;
    text-align: left;
`

const course = (props) => {

    return (
        <Draggable draggableId={props.code} index={props.index}>
            {(provided)=>(
                <StyledCourseDiv 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                        <p>{props.code} {props.name}</p>
                </StyledCourseDiv>
            )}
        </Draggable>
    )

}

export default course;