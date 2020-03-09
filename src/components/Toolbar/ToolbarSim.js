import React from 'react';
import styled from 'styled-components';
import Logo from './Logo/Logo';


const SytledDiv = styled.div`
    width: 100%;
    height: 3.5em;
    background-color: #51247A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`

const toolbarSim = (props) => {
    return (
        <SytledDiv>
            <Logo />
        </SytledDiv>
    );
}

export default toolbarSim;