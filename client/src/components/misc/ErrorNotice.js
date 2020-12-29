import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'


export default function ErrorNotice(props) {
    return (
            <Alert variant='danger' id="err_message">
            <span> {props.message} 
            <Link id='link_signin' to="/login"> {props.link}</Link>
            </span>
            <button onClick={props.clearError}>X</button>         
          
            </Alert>
         
    )
}
