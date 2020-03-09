import React from 'react';
import styled from 'styled-components';


const StyledDiv = styled.div`
    margin-left: 2em;
    display : flex;
    align-items: center;
`

const StyledP = styled.p`
    color: white;
    margin-right: 0.6em;
`
const StyledSelect = styled.select`
    border: 1px solid transparent;
    height: 2em;
    width: 8em;
`

const startingSemester = (props) => {
    
    const setStartingSemesterList = () => {
        let startingSemester = null;
        let semesterList = null;
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth() + 1;
        const todayYear = todayDate.getFullYear();
        if (1 <= todayMonth <= 7) {
            startingSemester = 'S1';
            semesterList = [startingSemester+' '+todayYear,
                            'S2'+' '+(todayYear-1),
                            startingSemester+' '+(todayYear-1),
                            'S2'+' '+(todayYear-2)];
        }else{
            startingSemester = 'S2';
            semesterList = [startingSemester+' '+todayYear,
                            'S1'+' '+todayYear,
                            startingSemester+' '+(todayYear-1),
                            'S1'+' '+(todayYear-1)];
        };
        return semesterList;
      };
      
    const startingSemesterList = setStartingSemesterList();   

    return (
    <StyledDiv>
        <StyledP>Starting Semester :</StyledP>
        <StyledSelect id="startingSemester" name="startingSemester" onChange={props.handleChange}>
            {startingSemesterList.map((elm, index)=><option key={'list'+index} value={elm}>{elm}</option> )}
        </StyledSelect>
    </StyledDiv>
    )
};
    
export default startingSemester;

