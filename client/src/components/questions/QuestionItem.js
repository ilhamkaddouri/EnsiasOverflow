import React, { Fragment } from 'react'

function QuestionItem({qst}) {
    return (
        <Fragment>
            <div> 
                
                <p id="">{qst.title}</p>
                <br/>
                <label> <b>Asked on </b>{qst.date.substring(0,10)} </label>
                <br/>
               
            </div>
        </Fragment>
    )
}

export default QuestionItem
