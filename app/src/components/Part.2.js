import React from 'react';
import Course from './Course';
import CourseInfo from './CourseInfo';
import {Droppable,Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';


const Container = styled.div``;

class Part extends React.Component {
    constructor(props) {
        super(props);
        this.state = {display:'none'}
    }

    render() {
        const style={
            backgroundColor:'#5511aa',
            display: 'flex',
            height: '90%',
            width:'90%',
            border:'2px black solid',
            display: this.props.shouldHide === 'false' ? 'block' : 'none',
            overflow:'scroll',
        }
        const titleStyle={
            width:'100%',
            borderBottom:'3px solid white',
        }
        const titleLineStyle = {
            paddingLeft: '20px'
        }
        const flexStyle = {
            display:'flex',
            flexWrap: 'wrap',
            flexDirection:'row',
            alignItems:'stretch',
            justifyContent:'center'
        }
        const coursesStyle = {
            width:'60%'
        }
        const infoStyle = {
            width:'40%'
        }
        return (
            <div style={style}>
                <div style={titleStyle} >
                    <h3 style={titleLineStyle}>
                        {this.props.id}
                    </h3>
                </div>
                <div style={flexStyle}>
                    <div style={coursesStyle}>
                        {this.props.courses.map((obj,idx)=>(<Course key={idx} code={obj.code} name={obj.name} info={obj}/>))}
                    </div>
                    <div style={infoStyle}>
                        <CourseInfo />
                    </div>
                </div>
            </div>
        )
    }
}

export default Part;