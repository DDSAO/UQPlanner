import React from 'react'

class SemesterCard extends React.Component {
    render() {
        const style = {
            backgroundColor: 'lightyellow',
            width:'90%',
            display:'flex',
            justifyContent:'space-between',
            padding:'10px 0'

        };
        const codeStyle = {
            width:'30%',
            margin:'0 5%',
            textAlign:'center',
            wordWrap: 'normal'
            
        };
        const nameStyle = {
            width:'60%',
            wordWrap: 'normal'
        }
        return (
            
            <div style={style}>
                <div style={codeStyle}>
                    <strong>{this.props.code}</strong>
                </div>
                <div style={nameStyle}>
                    <i>{this.props.name}</i>
                </div>
            </div>
        )
    }
}

export default SemesterCard;