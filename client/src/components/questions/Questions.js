import React, { Fragment, useEffect, useState } from 'react';

import axios from "axios"
import QuestionItem from './QuestionItem';
const Questions = () => {
    const [qsts,setQsts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/questions/all').then(res => setQsts(res.data)).catch(err => console.log(err))
    }, [qsts]);

    return (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-thumbtack'></i> Welcome to DevBook's Posts
                section.
            </p>
            <p className='lead'>
                Here you can share your thoughts and questions with other
                Developers !
            </p>
            
            <div className='posts'>
                {qsts.map(qst => (
                    <QuestionItem key={qst.key} qst={qst}/>
                    
                   
                ))}
            </div>
        </Fragment>
    );
};


export default Questions;
