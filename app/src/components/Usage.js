import React from 'react'
import CourseContext from '../context'

class RequirementForm extends React.Component {
    static contextType = CourseContext;

    render() {
        const styleCancel={
            display:'flex',
            justifyContent:'flex-end',
            padding:'10px'
        }
        return (
            
            <div >
                 
                <div>
                    <h1>UQ Planner</h1>
                    <p>This is a website to help student make their study plans (Currently only for <strong>Master of Information Technology</strong> student only)</p>
                    <h3>Getting Start</h3>
                    <ol>
                    <li>Click the button <strong>"Set up required credits"</strong> on the top right to set up required credits for your program</li>
                    <li>Below is the courses for different Part, click left and right arrow to scroll back or forth</li>
                    <li>Drag the course that you want to study to the semester board</li>
                    <li>The green semester board means you can enroll this at that particular semester</li>
                    <li>Once you have selected your course, the credits will be calculated automatically for you</li>
                    </ol>
                    
                </div>
                <div style={styleCancel}>
                    <button onClick={this.context.closePop}>Good work!</button>
                </div>
                
            </div>
        )
    }
}

export default RequirementForm;