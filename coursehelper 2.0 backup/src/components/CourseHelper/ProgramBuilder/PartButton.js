import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 5em;
    margin: 0em 3em;
    padding: 0.4em 0em;
    border: 0px solid black;
    border-bottom: ${props => props.active === props.title ? '3px solid #51247A':'0px solid black'};
    background-color: rgba(0,0,0,0);
    font-size: 1em;
    font-weight: bold;
    color: ${props => props.active === props.title ? '#51247A':'#D8D8D8'};

    &:hover {   
        border-bottom: 3px solid #51247A;
        color: #51247A;
      }

`

const partButton = (props) => {

    return (
        <StyledButton 
                onClick={() => props.changePart(props.buttonTitle)} 
                title={props.buttonTitle} 
                active={props.currentPart}>
            {props.buttonTitle}
        </StyledButton>
    )
}

export default partButton;