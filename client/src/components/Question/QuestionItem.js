import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ErrorNotice from "../misc/ErrorNotice";
import "./style.css";
import axios from "axios";

function QuestionItem({ question }) {
  // console.log(question.user.username);

  const [questionAsked, setQuestionAsked] = useState({});
  const [author, setAuthor] = useState({question});

  //   const [author, setAuthor] = useState({});
  // const [responses, setResponses] = useState([]);
  // const questionId = match.params.id;
  useEffect(() => {
    axios
      .get("/posts/" + question)
      .then(JSON => {
        setQuestionAsked(JSON.data);
        setAuthor(JSON.data)
        console.log(author);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <h3 className="">{questionAsked.qst_title}</h3>
      <Card style={{ width: "70vw", borderColor: "black" }}>
        <Card.Body>
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
            Author: 
              <Card.Link href="#LinktoUser">
              {}

               </Card.Link>
            </div>
            <div
              className="mb-1 text-muted"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              On : {questionAsked.asked_date}
            </div>
          </Card.Subtitle>
          <Card.Text>
            <div
              dangerouslySetInnerHTML={{ __html: questionAsked.qst_content }}
            ></div>
          </Card.Text>
          <div className="ml-auto">
            {/* <span type="button" className="btn btn-success mr-2"  >
                <i className="fa fa-thumbs-up"></i> {' '}
                {question.qst_likes.length >0 && <span>{question.qst_likes.length}</span>} 
              </span> */}
            {/* <span type="button" className="btn btn-success">
                <i className="fa fa-thumbs-down"></i> {' '}
                {question.qst_dislikes.length >0 && <span>{question.qst_dislikes.length}</span>} 
              </span> */}
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default QuestionItem;
