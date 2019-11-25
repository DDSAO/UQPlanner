import React from 'react'

class StatusCard extends React.Component {
    render() {
        const style = {
            backgroundColor: 'transparent',
            padding:'10px',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            color:'white'

        };
        const codeStyle = {
            margin:'0 5px',
            textAlign:'center',
            wordWrap: 'normal'
            
        };
        const nameStyle = {

            wordWrap: 'normal'
        }
        return (
            
            <div style={style}>
                <div style={codeStyle}>
                    <h1>{this.props.name}:</h1>
                </div>
                <div style={nameStyle}>
                    <h1>{this.props.obtained}/{this.props.required}</h1>
                </div>
            </div>
        )
    }
}

export default StatusCard;