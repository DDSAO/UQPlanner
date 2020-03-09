import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    border: 1px solid transparent;
    height: 2em;
    margin-left: 5px;
`

const partSelectUnitLimit = (props) => {

    let part = null;
    if (props.part === 1){
        part ='Part B'
    }else if(props.part === 2){
        part ='Part C'
    }else if(props.part === 3){
        part ='Part D'
    }
    //console.log(part)


    return (
        <StyledSelect 
            id='selectunits' 
            name='selectunits' 
            onChange={props.changeMaxUnit}
            defaultValue={'default'}>
            <option value='default' disabled hidden>?</option>
            {props.partUnitLimit.map((unit,index) => 
                <option value={part+':'+unit} key={index}>{unit}</option>)}
        </StyledSelect>
        ) 
}

export default partSelectUnitLimit;