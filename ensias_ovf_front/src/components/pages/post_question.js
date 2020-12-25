import React, {useState, useContext} from "react";
import {Fragment} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";


export default function Post_question() {



  const userData = React.useContext(UserContext);

  console.log(userData);

  const [qst_title, setTitle] = useState();
  const [qst_content, setContent] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
  try{
      const newQuestion = {
          qst_title, 
          qst_content
      }
     
      const postres =  await Axios.post("http://localhost:5000/api/posts/ask", 
      newQuestion
      ,
      { headers :
        {'auth-token': localStorage.getItem("auth-token")}
      }
      );

      console.log(postres);

  }catch(err)
  {
    console.log(err);
  }
  }
    return (
        
        <Fragment>

             <div>

             <div className="container"> 

             <form onSubmit={submit} >
             <h1 className="label text-primary"> Got a question ?</h1>
            <div className="form-group">
                <label for="qst_title">Question title</label>
                <input type="text" 
                className="form-control"    
                id="qst_title" 
                aria-describedby="Put your question title here" 
                placeholder="Put your question title here"
                onChange={(e) => setTitle(e.target.value)}
                />
                <small id="qst_help" 
                className="form-text text-muted">
                Keep it simple !
                </small>
            </div>
            <div className="form-group">
                <label for="">Content</label>
                <textarea type="text" className="form-control full-width" 
                id="qst_content"
                 placeholder="Content of the question"
                 onChange={(e) => setContent(e.target.value)}          
                />
            </div>
                <button type="submit" className="btn btn-primary">Post</button>           
            </form>
            </div>
            </div>
        </Fragment>
   
    )
}
