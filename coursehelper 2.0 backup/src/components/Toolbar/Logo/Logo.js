import React from 'react';
import Logo from '../../../assets/logo.png';
import styled from 'styled-components';

const StyledDiv = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
`

const StyleImg = styled.img`
    height: 100%;
    width: auto;
`

const StyleP = styled.p`
    color: white;
    font-weight: bold;
`

const logo = () => (
    <StyledDiv>
        <StyleImg src={Logo} alt='Logo'></StyleImg>
        <StyleP>Master of Information Technology</StyleP>
    </StyledDiv>
);

export default logo;
