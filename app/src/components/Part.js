import React from 'react';
import Course from './Course';
import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';


class Part extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display:'none',
            basedCourses:this.props.courses,
            displayingCourses:this.props.courses,
            searching:false
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        if (e.target.value.length > 0) {
            this.setState({searching:true})
        } else {
            this.setState({searching:false})
        }
        
        let input = new RegExp(e.target.value,'i')
        let shouldDisplay = []
        this.context.courses.map((obj)=> {
            if (input.test(obj.name)||input.test(obj.code)) {
                shouldDisplay.push(obj)
            } 
        })
        
        this.setState({displayingCourses:shouldDisplay})
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.props.courses.length !== nextProps.courses.length){
            this.setState({displayingCourses:nextProps.courses})
        }
        
        return true
    }
    render() {
        const style={
            backgroundColor:'#5511aa',
            display: 'flex',
            height: '90%',
            width:'90%',
            border:'2px black solid',
            display: this.props.shouldHide === 'false' ? 'block' : 'none',
        }
        const titleStyle={
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            width:'100%',
            height:'10%',
            borderBottom:'3px solid white',
        }
        const titleLineStyle = {
            paddingLeft: '20px'
        }
        const flexStyle = {
            height:'89%',
            flexWrap: 'wrap',
            overflow:'scroll'
        }
        /*
        if ( this.state.basedCourses.length != this.props.courses.length) {
            this.setState({basedCourses:this.props.courses})
        }
        */
        return (
            
            <div style={style}>
                <div style={titleStyle} >
                    <h3 style={titleLineStyle}>
                        {this.props.id}
                    </h3>
                    <div style={{marginRight:'20px'}}>
                        <input type='text' onChange={this.onChange} placeholder={'search'}></input>
                    </div>
                    
                </div>
                <Droppable droppableId={this.props.id}>
                    {provided=>(
                        <div ref={provided.innerRef} {...provided.droppableProps} style={flexStyle}>
                            {this.state.displayingCourses.map((obj,idx)=> (
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