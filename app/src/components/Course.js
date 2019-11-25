import React from 'react'
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div``;


class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height:'50px',
            isExpanding:'false'
        }
        this.expand = this.expand.bind(this);
    }
    expand() {
        if (this.state.isExpanding === 'false') {
            this.setState({
                height:'400px',
                isExpanding:'true'
            })
        } else {
            this.setState({
                height:'50px',
                isExpanding:'false'
            })
        }       
    }
    render() {
        const style={
            display:'inline-block',
            backgroundColor:'tomato',
            padding:'0 10px',
            margin: '5px 10px',
            borderRadius:'10px',
            boxShadow: '5px 5px 5px grey',

        }
        return (
            
            <div style={style}>
                <p className='courseName'><strong>{this.props.info.code}</strong> | <i>{this.props.info.name}</i></p>  
                <p>Require: {this.props.info.prereq}</p>
                <p>Available: {this.props.info.semester}</p>
            </div>
         
        )
    }
  }

export default Course;