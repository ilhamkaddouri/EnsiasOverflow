import React, { Fragment, useEffect, useState } from 'react';

import axios from "axios"
import QuestionItem from './QuestionItem';
const Questions = () => {
    const [qsts,setQsts] = useState([])
    const [user,setUser] = useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/api/questions/all').then(res => {setQsts(res.data) }).catch(err => console.log(err))
    }, [qsts]);

    return (
        <Fragment>
            <div className= "container">
                <h1 className="label text-primary">Questions </h1>
                {qsts.map(qst => (
                    <QuestionItem key={qst.key} qst={qst}/>
                ))}
                </div>
        </Fragment>
    );
};


export default Questions;
