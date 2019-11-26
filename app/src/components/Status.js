import React from 'react';
import StatusCard from './StatusCard'
import CourseContext from '../context'

class Status extends React.Component {
    static contextType = CourseContext;

    constructor(props) {
        super(props);

    }
    render() {
        const style={
            backgroundColor:'#111111',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            height: '10%',
            minHeight:'50px',
            width:'100%'
        }
        const status = this.context.status.map((obj,idx)=>{
            return (<StatusCard key={idx} name={obj.part} obtained={obj.obtained} required={obj.required} />)
        })
        return (
            <div style={style}>
                {status}
            </div>
        )
    }
}

export default Status;