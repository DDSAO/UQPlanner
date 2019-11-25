import React from 'react';
import SemesterTitle from './SemesterTitle';
import SemesterCard from './SemesterCard';
import {Droppable} from 'react-beautiful-dnd';





class Semester extends React.Component {


    render() {
        const style={
            backgroundColor:'#5511aa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            height: '90%',
            width:'20%',
            minWidth:'200px',
            border:'2px solid black',
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
        console.log(this.props.courses)
        const courses = this.props.courses.map((obj,idx)=>(<SemesterCard key={idx} code={obj.code} name={obj.name} />))
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