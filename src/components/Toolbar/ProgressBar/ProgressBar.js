import React from 'react';
import styled from 'styled-components';
import PartSelectUnitLimit from './PartSelectUnitLimit';

const StyledDiv = styled.div`
    display: flex;
    color: white;
    padding-right: 2em;
    display: flex;
`

const StyledP = styled.p`
    padding-left: 1em;
`

const StyledUnitsDiv =  styled.div`
    display: flex;  
    align-items: center;
`

const progressBar = (props) => {

    const partsList = Object.keys(props.units);
    const units = Object.values(props.units);
    const unitLimitArray = Object.values(props.maxUnits);
    //console.log(partsList);
    let unitLimit = [];
    let partSelectUnitLimit = null;
    unitLimitArray.forEach((partUnitLimit,index) => {
        if(partUnitLimit.length === 1){
            unitLimit.push(partUnitLimit)
        }else if (partUnitLimit.length > 1){
            //console.log(partUnitLimit);
            partSelectUnitLimit = 
                <PartSelectUnitLimit key={'Max Unit Part '+index}
                                     partUnitLimit={partUnitLimit}
                                     changeMaxUnit={props.changeMaxUnit}
                                     part={index}/>;
            unitLimit.push(partSelectUnitLimit);
            //console.log(index)
        }
    })

     return (
         <StyledDiv>
            {partsList.map((elm, index) => {
                return (
                    <StyledUnitsDiv key={'partlist'+index}>
                        <StyledP>{elm+': '+units[index]+'/'}{unitLimit[index]}</StyledP>
                    </StyledUnitsDiv>
                )
                })}
         </StyledDiv>
     );
}

export default progressBar;