import React from 'react';
import {Fragment} from 'react';
import Register from '../auth/reg' ;
import Login from '../auth/login';
import Footer from '../layout/Footer';
import {Link} from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice"
import Post_question from "../pages/post_question"
export default function home() {
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg logan">
                        <h1 className="label">Bienvenue au EnsiasOverflow</h1>
                        <p>Votre propre monde professionel</p>
                    </div>
                    <div className="col-lg">
                        {/* <Login/> */}
                        <Post_question></Post_question>
                    </div>
                </div>  
            </div>
            <Footer/>


        </Fragment>
        
    )
}
