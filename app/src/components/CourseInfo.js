import React from 'react';

const style={
    boxSizing:'border-box',
    width:'100%',
    height:'100%',
    backgroundColor:'lightyellow',
    border:'2px solid grey',
    borderRadius:'20px',
}
class CourseInfo extends React.Component {
    render() {
        return (
            <div style={style}>
                info
            </div>
        )
    }
}

export default CourseInfo;