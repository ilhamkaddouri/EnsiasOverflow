import React,{Fragment} from 'react'
import Card from "react-bootstrap/Card";
import ErrorNotice from "../misc/ErrorNotice";

const QuestionItem =({question}) => {
    return (
      
        <Fragment>
          <h3 className=''>{question.qst_title}</h3>
        <Card style={{ width: "70vw" ,borderColor:'black'}}>
          <Card.Body>

            <Card.Subtitle className="mb-2 text-muted">
              Asked by :<Card.Link href="#LinktoUser"> {question.username}</Card.Link>
            </Card.Subtitle>
            <Card.Subtitle className="mb-1 text-muted">             
              On : {question.asked_date}
            </Card.Subtitle>
            <Card.Text>{question.qst_content}</Card.Text>
            {/* <div className="ml-auto">
              <span type="button" className="btn btn-success mr-2"  >
                <i className="fa fa-thumbs-up"></i> {' '}
                {question.qst_likes.length >0 && <span>{question.qst_likes.length}</span>} 
              </span>
              <span type="button" className="btn btn-success">
                <i className="fa fa-thumbs-down"></i> {' '}
                {question.qst_dislikes.length >0 && <span>{question.qst_dislikes.length}</span>} 
              </span>
             
            </div> */}
          </Card.Body>
        </Card>
      </Fragment>
    )
}

export default QuestionItem
