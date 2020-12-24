import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'


export default function SuccessNotice(props) {
    return (
        <div>
            <Alert variant='success' id='succ_message'>
            <span> {props.message} 
            <Link id='link_signin' to="/login"> <br/> Sign in Now</Link></span>
            
            {/* <button onClick={props.clearError}>X</button>          */}
            
            </Alert>
        </div>
    )
}
