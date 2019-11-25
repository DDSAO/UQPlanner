import React from 'react'

class Arrow extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        const style={
            width:'40px',
            height:'40px',
            margin:'10px',
            background: this.props.background
        };
        return (
            <div onClick={this.props.onClick} style={style}>

            </div>
        )
       
    }
}
export default Arrow;