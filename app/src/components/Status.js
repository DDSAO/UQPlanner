import React from 'react';
import StatusCard from './StatusCard'
import CourseContext from '../context'

class Status extends React.Component {
    static contextType = CourseContext;

    render() {
        const styleOverall={
            backgroundColor:'#111111',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            height: '10%',
            minHeight:'50px',
            width:'100%'
        }
        const styleLeft={
            backgroundColor:'#111111',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            height: '10%',
            minHeight:'50px',
            width:'70%'
        }
        const styleRight={
            backgroundColor:'#111111',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
            height: '10%',
            minHeight:'50px',
            width:'30%'
        }

        const status = this.context.status.map((obj,idx)=>{
            return (<StatusCard key={idx} name={obj.part} obtained={obj.obtained} required={obj.required} />)
        })
        

        
        return (
            <div style={styleOverall}>
                <div style={styleLeft}>{status}</div>
                <div style={styleRight}>
                <button onClick={this.context.showUsage}>How to use</button>
                <button onClick={this.context.showRequirement}>Set up required credits</button>
                </div>
                
            </div>
            
        )
    }
}

export default Status;