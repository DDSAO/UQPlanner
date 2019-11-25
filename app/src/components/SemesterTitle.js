import React from 'react'

class SemesterTitle extends React.Component {
    render() {
        const style = {
            backgroundColor: 'transparent',
            width:'100%',
            padding:'10px 0',
            textAlign:'center',
            borderBottom:'5px solid white'

        };
        return (
            
            <div style={style}>
                {this.props.name}
            </div>
        )
    }
}

export default SemesterTitle;