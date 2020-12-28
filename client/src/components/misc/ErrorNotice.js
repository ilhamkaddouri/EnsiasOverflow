import React from 'react'
import Alert from 'react-bootstrap/Alert'



export default function ErrorNotice(props) {
    return (
            <Alert variant='danger' id="err_message">
            <span> {props.message} </span>
            <button onClick={props.clearError}>X</button>           
            </Alert>
         
    )
}
