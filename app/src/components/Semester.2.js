import React from 'react';
import SemesterTitle from './SemesterTitle';
import SemesterCard from './SemesterCard';
import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div``;

class Semester extends React.Component {
    render() {
        const style={
            backgroundColor:'#5511aa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90%',
            width:'20%',
            minWidth:'200px',
            border:'2px solid black',
            borderRadius:'20px'
        }
        
        return (
            <div style={style}>
                <SemesterTitle name={ 'Semester ' + String(this.props.semesterIndex)}/> 
                
            </div>
        )
    }
}

export default Semester;