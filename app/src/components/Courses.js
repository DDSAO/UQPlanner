import React from 'react';
import Arrow from './Arrow';
import Part from './Part';

import CourseContext from '../context'



class Courses extends React.Component {
    static contextType = CourseContext;

    constructor(props) {
        super(props)
        this.state = {
            currentPartIndex:0,
            style:{
                backgroundColor:'#dddddd',
                display: 'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                height: '50%',
                width:'100%'
            },
        } 
        this.rowBack = this.rowBack.bind(this);
        this.rowForward = this.rowForward.bind(this)
    }

 
    rowBack() {
        this.setState((preState, props)=>{
            return {currentPartIndex:
                (preState.currentPartIndex + this.context.parts.length - 1) % this.context.parts.length }
        })
    }
    rowForward() {
        this.setState((preState, props)=>{
            return {currentPartIndex:
                (preState.currentPartIndex +  1) % this.context.parts.length }
        })
    }
    createPart(obj,idx) {
        let shouldHide = 'true';
        
        if (idx === this.state.currentPartIndex) {
            shouldHide = 'false'
        } 

        return <Part shouldHide={shouldHide} key={idx} id={obj}/>
    }
    render() {
        const { coursesDict } = this.context;
        var parts=[]
        console.log(coursesDict)
        if (coursesDict != undefined) {

            parts = Object.entries(coursesDict).map((obj,idx)=>{
                let shouldHide = 'true';
            
            if (idx === this.state.currentPartIndex) {
                shouldHide = 'false'
            } 
    
            return <Part shouldHide={shouldHide} key={idx} id={obj[0]} courses={obj[1]} />
            });

        } 
        
        return (
            
            <div style={this.state.style}>
                <Arrow background='red' onClick={this.rowBack}/>  
                {parts}
                <Arrow background='green' onClick={this.rowForward}/>
            </div>
        )
    }
}

export default Courses;