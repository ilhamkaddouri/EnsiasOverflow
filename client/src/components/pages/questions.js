import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios"
import QuestionItem from "../pages/QuestionItem";


const Questions = () => {

    const [qsts,setQsts] = useState([])
    const [user,setUser] = useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/api/posts/all')
        .then(res => {setQsts(res.data) })
        .catch(err => console.log(err))
    }, []);


    return (
        <Fragment>
        <div className= "container">
            <h1 className="label text-primary">Questions </h1>
            {qsts.map(qst => (
                <QuestionItem
                key={qst._id} 
                qst={qst}
                />
            ))}
            </div>
    </Fragment>
);
      }
export default Questions;