import React from 'react'
import CourseContext from '../context'
import Usage from './Usage.js'
import RequirementForm from './RequirementForm.js'


class Popup extends React.Component {
    static contextType = CourseContext;

    render() {
        const styleBackground={
            position:'fixed',
            width:'100%',
            height:'100%',
            margin:'auto',
            background: 'rgba(0,0,0, 0.5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        
        };
        const styleFront={
            maxHeight:'80%',
            maxWidth:'80%',
            position:'absolute',
            padding:'20px',
            margin:'auto',
            background:'white',
        }
        const poping = () => {
            switch (this.props.poping) {
                case 'requirement': return <RequirementForm/>;
                case 'usage': return <Usage/>;
                default: return null;
            }
        }

        return (
            <div style={styleBackground}>
                <div style={styleFront}>

                    {poping()}
                </div>
            </div>
        )
       
    }
}
export default Popup;