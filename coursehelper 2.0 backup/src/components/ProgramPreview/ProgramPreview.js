import React from 'react';
import SemesterPreview from './SemesterPreview';
import styled from 'styled-components';

const StyledDiv = styled.div`
    height: 35vh;
    display: flex;
    padding: 1.5em 0em;
    margin-left: 4em;
    margin-right: 4em;
    justify-content: space-between;
`

const programPreview = (props) => {

    let semesters = null;
    let years = null;
    const year = parseInt(props.startingSemester.substring(3));
    if (props.startingSemester.substring(0,2)==='S1'){
        semesters = ['Semester 1', 'Semester 2', 'Semester 1', 'Semester 2'];
        years = [year, year, year+1, year+1]
    };
    if (props.startingSemester.substring(0,2)==='S2'){
        semesters = ['Semester 2', 'Semester 1', 'Semester 2', 'Semester 1'];
        years = [year, year+1, year+1, year+2]
    }

    let semesterPreviews = semesters.map((elm, index)=>
        <SemesterPreview semester={elm} 
                         year={years[index]}
                         key={'semester'+index}
                         id={String(index)}
                         selectedCourses={props.selectedCourses}
                         index={index}
                         draggedCourseSemester={props.draggedCourseSemester}/>)

    return (
        <StyledDiv>
            {semesterPreviews}
        </StyledDiv>
    )
};

export default programPreview;