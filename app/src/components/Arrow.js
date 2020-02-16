import React from 'react'

class Arrow extends React.Component {

    render() {
        const style={
            width:'40px',
            height:'80%',
            margin:'10px',
            padding:'auto',
            background:'lightgrey',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        };
        
        return (
            <div onClick={this.props.onClick} style={style}>
                <h1>{this.props.direction==='left'?'⬅️':'➡️'}</h1>
            </div>
        )
       
    }
}
export default Arrow;