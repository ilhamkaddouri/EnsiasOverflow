import React, { useState, useContext } from "react";
import { Fragment } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
// import List from '@editorjs/list';

export default function Post_question() {

  const userData = useContext(UserContext);

  /** Successfully accessed userData */
  // console.log(userData.userData.token);

  const [qst_title, setTitle] = useState();
  const [qst_content, setContent] = useState();

  /** Error posting the question */
  const [error, setError] = useState();

  /** Successfully posted question */
  const [success, setSuccess] = useState();


  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = userData.userData.token;
      if (token == undefined) {
        setError("Log in to ask a question. ");
      }

      const newQuestion = {
        qst_title,
        qst_content,
      };

      const postres = await Axios.post("/posts/ask", newQuestion, {
        headers: { "auth-token": userData.userData.token },
      });

      if (postres) {
        setSuccess("Question posted successfully !");
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <Fragment>
      <div>
        <div className="container">
          <form onSubmit={submit}>
            <h1 className="label text-primary"> Got a question ?</h1>

            {success && (
              <SuccessNotice
                message={success}
                clearError={() => setSuccess(undefined)}
              />
            )}

            <div className="form-group">
              {error && (
                <ErrorNotice
                  message={error}
                  clearError={() => setError(undefined)}
                />
                
              )}
              <label for="qst_title">Question title</label>
              <input
                type="text"
                className="form-control"
                id="qst_title"
                aria-describedby="Put your question title here"
                placeholder="Put your question title here"
                onChange={(e) => setTitle(e.target.value)}
              />
              <small id="qst_help" className="form-text text-muted">
                Keep it simple !
              </small>
            </div>
            <div className="form-group">
              <label for="">Content</label>
              <textarea
                type="text"
                className="form-control full-width"
                id="qst_content"
                placeholder="Content of the question"
                onChange={(e) => setContent(e.target.value)}
              />

              
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
