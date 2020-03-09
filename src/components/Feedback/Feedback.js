import React, { Component } from 'react';
import styled from 'styled-components';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ToolbarSim from '../../components/Toolbar/ToolbarSim';
import CloseIcon from '../../assets/close.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StyledDiv = styled.div`
    background-color: #F3F3F3;
    width: auto;
    height: 100vh;
    padding: 10vh 10vw;
`

const StyledTextDiv = styled.div`
    lineHeight: 1.5;
    text-align: justify;
`

const StyledIconDiv = styled.img`
    width: 25px;
    height: auto;
    paddingBottom: 1em
`

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 20vh;
`

const StyledInput = styled.input`
    padding: 0.5em;
    color: #8F6CAE;
    font-weight: bold;
    margin-top: 2em;
    &:hover {
        background-color: #8F6CAE;
        color: white;
        transition: 0.2s ease all;
    }
`


class Feedback extends Component  {

    state ={
        textValue : '',
    }

    handleChange = (event) => {
        this.setState({
            textValue : event.target.value
        })
        console.log(event.target.value)
    }

    submitHandler = (event) => {
        event.preventDefault();
        const feedback = {
            feedback : this.state.textValue
        }
        axios.post('https://uq-it-coursehelper.firebaseio.com/feedback.json', feedback)
            .then( response => {
                this.props.history.push('/')
            })
    }

    render() {

        return (
            <Aux>
                <ToolbarSim/>

                <StyledDiv>

                <div style={{textAlign: 'right'}}>
                    <Link to='/' exact>
                        <StyledIconDiv src={CloseIcon} alt='closeIcon'/>
                    </Link>
                </div>
    
                <StyledTextDiv>
                    <h3 style={{color:'#8F6CAE' , paddingBottom: '3em'}}>Easy Planning and Happy Study !</h3>
                    <p>When I first started UQ's Master of Information Technology, I was overwhelmed by the complexity of making my study plan. I had to jump 
                        between different website pages trying to figure out what electives the program offers, which semester each course is offered, what 
                        pre-requisites I need and how I can fit all the courses that interest me in my period of study at UQ. </p>
                    <p style={{paddingBottom: '2em'}}>
                        Luckily I was studying IT and I can solve this problem with the help of technology. I teamed up with my friend Hao and developed this web 
                        app. We hope it can make this planning process a little bit easier for you, so that you can start your degree with a clearer plan. </p>
                    <h4 style={{color:'#8F6CAE', paddingBottom: '1em'}}>Did you find the planner helpful ?</h4>
                </StyledTextDiv>
                <form onSubmit={this.submitHandler} style={{textAlign:'center'}}>
                    <StyledTextarea placeholder='Tell us what you think of our study planner' 
                                    value={this.state.textValue}
                                    onChange={this.handleChange}/>
                    <StyledInput type="submit" value="Submit" />
                </form>

                </StyledDiv>
            </Aux>
        )
    }
    
}

export default Feedback;