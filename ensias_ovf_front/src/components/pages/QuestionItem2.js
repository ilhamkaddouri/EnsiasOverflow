/**
 * 
 * This is another version of QUESTIONITEM.JS using props
 * Thought it would be useful too to keep it ^^
 */


import React, { Fragment, useState} from "react";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
const QuestionItem = props => {
    const { _id, user, qst__title, username,qst_content,qst_likes, qst_dislikes, asked_date} = props.qst;
    
    // const [isLiked, updateLike] = useState(false);

    const handleLike = () => {
            console.log(_id);
            console.log(qst_title);
            /** We just log the props here nothing more */
      };

  return (
    <Fragment>
      <Card style={{ width: "70vw" }}>
        <Card.Body>
        <Card.Title>{props.qst.qst_title} N ° { props.qst._id} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Asked by :<Card.Link href="#LinktoUser"> {props.qst.username} </Card.Link>
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted">
            {" "}
            On : {props.qst.asked_date.substring(0, 10)}{" "}
          </Card.Subtitle>
          <Card.Text>{props.qst.qst_content}</Card.Text>
          <div className="ml-auto">
            <button type="button" className="btn btn-light" value={props.qst._id}
             onClick={handleLike} 
             >
              <i className="fa fa-thumbs-up"></i>{" "}
              {props.qst.qst_likes.length > 0 && <span>{props.qst.qst_likes.length}</span>}
            </button>
            <button type="button" className="btn btn-light">
              <i className="fa fa-thumbs-down"></i> 
            </button>
            <Link to={`/posts/${props.qst._id}`} className="btn btn-primary">
              View answers{" "}
              {props.qst.responses.length > 0 && (
                <span className="comment-count">{props.qst.responses.length}</span>
              )}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default QuestionItem;
