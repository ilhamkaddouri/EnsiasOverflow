import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

function QuestionItem({ qst }) {
  /**
   * Here we Initialize the states with the Number values :
   *  Like & dislike which we call in the render method
   */
  const [like, setlikes] = useState([qst.qst_likes.length]);
  const [dislike, setdislikes] = useState([qst.qst_dislikes.length]);

  const handleLike = (id) => {
    // const id = _id;
    axios
      .put("/posts/like/" + id, null, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((result) => {
        console.log();
        const newLikes = result.data.qst_likes.length;
        setlikes([newLikes]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDislike = (id) => {
    axios
      .put("/posts/unlike/" + id, null, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((result) => {
        /**
         * Here the result displays the dislikes.lenght
         */
        const newDislikes = result.data;
        setdislikes(newDislikes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Card style={{ width: "70vw" }}>
        <Card.Body>
          <Card.Title>{qst.qst_title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Asked by :<Card.Link href="#LinktoUser"> {qst.username} </Card.Link>
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted">
            {" "}
            On : {qst.asked_date.substring(0, 10)}{" "}
          </Card.Subtitle>
          <Card.Text>{qst.qst_content}</Card.Text>
          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                handleLike(qst._id);
              }}
            >
              <i className="fa fa-thumbs-up"></i> 
            
              <span> {like} </span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                handleDislike(qst._id);
              }}
            >
              <i className="fa fa-thumbs-down"></i>{" "}
              {qst.qst_dislikes.length > 0 && (
                <span> {dislike}</span>
              )}
            </button>
            <Link to={`/posts/${qst._id}`} className="btn btn-primary">
              View answers{" "}
              {qst.responses.length > 0 && (
                <span className="comment-count">{qst.responses.length}</span>
              )}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default QuestionItem;
