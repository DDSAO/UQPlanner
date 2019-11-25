import React from 'react';
import StatusCard from './StatusCard'

class Status extends React.Component {
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
        return (
            <div style={style}>
                <StatusCard name='PartA' obtained='0' required='12' />
                <StatusCard name='PartB' obtained='0' required='8' />
            </div>
        )
    }
}

export default Status;