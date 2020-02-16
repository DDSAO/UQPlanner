import React from 'react'
import Semester from './Semester'

import CourseContext from '../context'

class Semesters extends React.Component {
    static contextType = CourseContext;

    delect(info,semester) {
    
        this.context.delect(info,semester)
    }
    render() {
        //const { semestersDict } = this.context;
        const style={
            backgroundColor:'#dddddd',
            display: 'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            height: '40%',
            width:'100%'
        }
        var semesters = []
        if (Object.entries(this.context.semestersDict) !== 0) {
            semesters = Object.entries(this.context.semestersDict).map((obj,idx)=>{
                return <Semester delect={this.delect.bind(this)} key={idx} semesterIndex={obj[0]} courses={obj[1]} canSelect={this.context.canSelect.includes(obj[0])} />
            })
        } 
        
        return (
            <div style={style}>
                {semesters}
            </div>
        )
    }
}

export default Semesters;