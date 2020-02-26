import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    color: white;
    padding-right: 2em;
`

const StyledP = styled.p`
    padding-left: 1em;
`

const progressBar = (props) => {

    const partsList = Object.keys(props.units);
    const units = Object.values(props.units);
    const unitLimit = Object.values(props.maxUnits);
    //console.log(partsList);
    //console.log(units);

     return (
         <StyledDiv>
            {partsList.map((elm, index) => {return <StyledP key={'partlist'+index}>{elm+': '+units[index]+'/'+unitLimit[index]}</StyledP>})}
         </StyledDiv>
     );
}

export default progressBar;