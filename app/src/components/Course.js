import React from 'react'
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    display:inline-block;
    padding:0 10px;
    margin: 5px 10px;
    border-radius:10px;
    box-shadow: 5px 5px 5px grey;
    background-color: tomato;
    opacity: ${props => (props.isDragging ? '0.8' :'1')};
`;




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
            padding:'0 10px',
            margin: '5px 10px',
            borderRadius:'10px',
            boxShadow: '5px 5px 5px grey',
            backgroundColor: props => (props.isdragging ? 'black' :'tomato'),

        }
        return (
            <Draggable key={this.props.info.code} draggableId={this.props.info.code} index={this.props.idx}>
                {(provided, snapshot)=>(
                    <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
                       
                            <p className='courseName'>
                                <strong>{this.props.info.code} | <i>{this.props.info.name}</i> | Units: {this.props.info.unit}</strong>
                            </p>  
                            <p>Require: {this.props.info.prereq}</p>
                            <p>Available: {this.props.info.semester}</p>
                       
                    </Container>
                )}    
            </Draggable>
            
         
        )
    }
  }

export default Course;