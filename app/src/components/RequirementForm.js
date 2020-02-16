import React from 'react'
import CourseContext from '../context'

class RequirementForm extends React.Component {
    static contextType = CourseContext;

    render() {
        const styleForm={
            display:'flex',
            flexDirection:'column',
        }
        return (
            
            <div >
                <form style={styleForm} onSubmit={this.context.updateRequirement}>
                    <div><label>Part A: </label><input type='number' name='a' placeholder='0'></input></div>
                    <div><label>Part B: </label><input type='number' name='b' placeholder='0'></input></div>
                    <div><label>Part C: </label><input type='number' name='c' placeholder='0'></input></div>
                    <div><label>Part D: </label><input type='number' name='d' placeholder='0'></input></div>   
                
                    <div>
                        <input type='submit' value='Confirm'></input>
                        <button onClick={this.context.closePop}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RequirementForm;