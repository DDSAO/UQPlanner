import React from 'react';
import SemesterTitle from './SemesterTitle';
import SemesterCard from './SemesterCard';
import {Droppable} from 'react-beautiful-dnd';

class Semester extends React.Component {


    render() {
        let borderColor = 'black';
        const style={
            backgroundColor:this.props.canSelect ? 'green' : '#5511aa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            height: '90%',
            width:'20%',
            minWidth:'200px',
            border:'2px solid',
            //borderColor: this.props.canSelect ? 'black' :'black',
            //borderWidth: this.props.canSelect ? '4px' :'2px',
            borderRadius:'20px'
        }
        const placeholderStyle={
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            height:'100%',
            width:'100%'
        }
        const courses = this.props.courses.map((obj,idx)=>(<SemesterCard key={idx} info={obj} />))
        return (
            <div style={style}>
                <SemesterTitle name={ 'Semester ' + String(this.props.semesterIndex)}/>
                <Droppable droppableId={this.props.semesterIndex}>
                    {provided=>(
                        <div ref={provided.innerRef} {...provided.droppableProps} style={placeholderStyle}>
                        {courses}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </div>
        )
    }
}

export default Semester;