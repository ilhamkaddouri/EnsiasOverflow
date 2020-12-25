import React, {useState, Component, Fragment} from 'react';
import {Link } from 'react-router-dom';
import Axios from 'axios';
import { Container } from 'react-bootstrap';

const Question = props => (
    <div> 
        <h3 id="questionTitle">{props.question.qst_title}</h3>
        <p id="">{props.question.qst_content}</p>
        <br/>
        <label> <b>Asked on </b>{props.question.asked_date.substring(0,10)} </label>
        <br/>
        <label htmlFor=""> <b> Author :  </b>{props.question.username}</label>
    </div>
)

export default class ListQuestions extends Component{
    
  constructor(props){
        super(props);
        this.state = { questions : []} 
    }
    componentDidMount()
    {
        Axios.get('http://localhost:5000/api/posts/all').then((response)=>{        
             const data = response.data;
             this.setState({ questions: data });
             console.log(data);
           }).catch((error)=>{
             console.log(error);
           });
    }

    // questionList(){
    //     return this.state.questions.map(current_question =>{
    //         return <Question question= {current_question} key={current_question._id}></Question>
    //     })
    // }
    qstList() {
        return this.state.questions.map(qst => {
          return <Question question={qst} key={qst._id}/>;
        })
    }
    
    //   function displayQuesitons(data){
    //     if(!data.lenght) return null;
    //   }

    render(){
        return (
                <div className= "container">
                <h1 className="label text-primary">Questions </h1>
               
                        {this.qstList()}
                 
                </div>

        );
    }
}
