import React from 'react'

class SemesterCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {hover:false}
        
    }
    hoverEnter(){
        this.setState({hover:true})
    }
    hoverLeave(){
        this.setState({hover:false})
    }
    delect(){
        this.props.delect(this.props.info,this.props.semesterIndex)
    }
    
    render() {
        const style = {
            backgroundColor: 'lightyellow',
            width:'90%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
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
        const cancelStyle = {
            background: this.state.hover ? 'red': 'transparent',
            cursor:'pointer',
        }
        return (
            
            <div style={style}>
                <div style={codeStyle}>
                    <strong>{this.props.info.code}</strong>
                </div>
                <div style={nameStyle}>
                    <i>{this.props.info.name}</i>
                </div>
                <div style={cancelStyle} onClick={this.delect.bind(this)} onMouseEnter={this.hoverEnter.bind(this)} onMouseLeave={this.hoverLeave.bind(this)}>&#9746;</div>
            </div>
        )
    }
}

export default SemesterCard;