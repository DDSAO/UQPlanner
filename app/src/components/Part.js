import React from 'react';
import Course from './Course';
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
        }
 
        return (
            
            <div style={style}>
                <div style={titleStyle} >
                    <h3 style={titleLineStyle}>
                        {this.props.id}
                    </h3>
                </div>
                <Droppable droppableId={this.props.id}>
                    {provided=>(
                        <div ref={provided.innerRef} {...provided.droppableProps} style={flexStyle}>
                            {this.props.courses.map((obj,idx)=> (
                                <Course key={obj.code} idx={idx} info={obj} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
               
            </div>
        )
    }
}

export default Part;
/*
<Draggable key={obj.code} draggableId={obj.code} index={idx}>
                                    {(provided,snapshot)=>(
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                            <Course code={obj.code} name={obj.name} info={obj}/>
                                        </div>
                                    )}    
                                </Draggable>
*/