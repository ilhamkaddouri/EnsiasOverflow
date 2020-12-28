import React, { Fragment, useState} from "react";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import axios from "axios"

function QuestionItem({ qst, LikedQuestions, setLikedQuestions }) {
    const { _id, user, qst__title, username,qst_content,qst_likes, qst_dislikes, asked_date} = qst;
    // const [isLiked, updateLike] = useState(false);
    const handleLike = () => {
        const id = _id;
        axios.put('/posts/like/'+id, 
        null, 
        // 
        { headers: { "auth-token": localStorage.getItem("auth-token") } })
        .then(res => { setLikedQuestions(res) })
        .catch(err => console.log(err))
        console.log(id);
        // let currentLikedQuestions = LikedQuestions;
        // console.log(currentLikedQuestions);
    }

    const handleDislike = () => {
        const id = _id;
        axios.put('/posts/unlike/'+id, 
        null,
        { headers: { "auth-token": localStorage.getItem("auth-token") } }
        ).then(res => { setLikedQuestions(res) })
        .catch(err => console.log(err))
    }


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
            <button type="button" className="btn btn-light" onClick={handleLike} >
              <i className="fa fa-thumbs-up"></i>{" "}
              {qst.qst_likes.length > 0 && <span>{qst.qst_likes.length}</span>}
            </button>
            <button type="button" className="btn btn-light" onClick={handleDislike}>
              <i className="fa fa-thumbs-down"></i> {" "}
              {qst.qst_dislikes.length > 0 && <span>{qst.qst_dislikes.length}</span>}
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
