import React, { Fragment } from 'react'
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom';
function QuestionItem({qst}) {
    return (
        <Fragment>
           <Card style={{ width: "70vw" }}>
               
                <Card.Body>
                    <Card.Title>{qst.qst_title} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    Asked by :
                    <Card.Link href="#LinktoUser"> {qst.username} </Card.Link>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1 text-muted">
                    {" "}
                    On : {qst.asked_date.substring(0, 10)}{" "}
                    </Card.Subtitle>
                    <Card.Text>{qst.qst_content}</Card.Text>
                    <div className="ml-auto"> 
                    <button
                            
                            type='button'
                            className='btn btn-light'
                        >
                            <i className='fa fa-thumbs-up'></i>{' '}
                            {qst.qst_likes.length > 0 && <span>{qst.qst_likes.length}</span>}
                        </button>
                        <button
                            
                            type='button'
                            className='btn btn-light'
                        >
                            
                            <i className='fa fa-thumbs-down'></i>
                        </button>
                    <Link to={`/questions/${qst._id}`} className='btn btn-primary'>
                            View answers{' '}
                            {qst.responses.length > 0 && (
                                <span className='comment-count'>
                                    {qst.responses.length}
                                </span>
                            )}
                        </Link>
                    </div>
                    
                </Card.Body>
                </Card>

        </Fragment>
    )
}

export default QuestionItem
