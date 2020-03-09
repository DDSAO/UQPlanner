import React from 'react';
import styled from 'styled-components';
import StartingSemester from './StartingSemester/StartingSemester';
import Logo from './Logo/Logo';
import ProgressBar from './ProgressBar/ProgressBar';


const SytledDiv = styled.div`
    width: 100%;
    height: 3.5em;
    background-color: #51247A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
`

const toolbar = (props) => {
    return (
        <SytledDiv>
            <StartingSemester handleChange={props.changeSemester}/>
            <Logo />
            <ProgressBar units={props.units} maxUnits={props.maxUnits} changeMaxUnit={props.changeMaxUnit}/>
        </SytledDiv>
    );
}

export default toolbar;