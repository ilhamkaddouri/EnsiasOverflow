import React, { Fragment, useState,useEffect} from "react";
import "font-awesome/css/font-awesome.min.css";
import QuestionItem from "../Question/QuestionItem"
import ResponseForm from './ResponseForm'
import ResponseItem from './ResponseItem'
import { Link } from "react-router-dom";
import axios from 'axios'


const Question =({match}) => {
    const [question,setQuestion] = useState({})
    const [responses,setResponses] = useState([])
    const questionId = match.params.id;
    useEffect(()=>{
        axios.get('/posts/'+questionId)
        .then(res => {setQuestion(res.data) })
        .catch(err => console.log(err))
        axios.get('http://localhost:5000/api/posts/reponses/'+match.params.id).then(res => setResponses(res.data)).catch()
    },[])
    return (
        <Fragment>
            
            <div className="container" >
                <Link to='/posts/all'><i className="fa fa-arrow-left"></i>Back to questions</Link>
                <QuestionItem question={question}/>
            <div>
            <div className="border m-2"></div>
                <p className="">{responses.length} answers</p>
                    
                    {responses.map(response => (
                        <ResponseItem  key={response._id} questionId={questionId}
                        response={response} />

                    
                    
                    ))}
            </div>
            <div className="border m-2"></div>
            <ResponseForm id={question._id}/>
            </div>
                
           
            
        </Fragment>
    )
}

export default Question
