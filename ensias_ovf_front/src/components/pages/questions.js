import React, { useState, Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// function sayHello() {
//     alert('Hello!');
//   }


const Question = (props) => (
  // <div>
  //     <h3 id="questionTitle" >{props.question.qst_title}</h3>
  //     <p id="questionContent" >{props.question.qst_content}</p>
  //     <br/>
  //     <label> <b>Asked on </b>{props.question.asked_date.substring(0,10)} </label>
  //     <br/>
  //     <label htmlFor=""> <b> Author :  </b>{props.question.username}</label>
  // </div>
  <div>
    <Card style={{ width: "70vw" }}>
      <Card.Body>
        <Card.Title>{props.question.qst_title} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Asked by :
          <Card.Link href="#LinktoUser"> {props.question.username} </Card.Link>
        </Card.Subtitle>
        <Card.Subtitle className="mb-1 text-muted">
          {" "}
          On : {props.question.asked_date.substring(0, 10)}{" "}
        </Card.Subtitle>
        <Card.Text>{props.question.qst_content}</Card.Text>
        {/* <Card.Link href="#" className="btn-success">Add an answer</Card.Link> */}
        <Button variant="outline-success"> Add an answer </Button>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
      {/* <Card.Footer className="text-muted">   
        <button onClick={sayHello} className="vote"> </button>
      </Card.Footer> */}
    </Card>

    <br></br>
  </div>
);

export default class ListQuestions extends Component {

  constructor(props) {
    super(props);
    this.state = { questions: [] };
    // this.sayHello = this.sayHello.bind(this);
  }

 

  componentDidMount() {
    Axios.get("http://localhost:5000/api/posts/all")
      .then((response) => {
        const data = response.data;
        this.setState({ questions: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  qstList() {
    return this.state.questions.map((qst) => {
      return <Question question={qst} key={qst._id} />;
    });
  }


  render() {
    return (
      <div className="container">
        <h1 className="label text-primary">Questions </h1>
        {this.qstList()}
      </div>
    );
  }
}
