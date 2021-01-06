import React, { Fragment, useState } from "react";
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import QuillEditor from "../pages/editor/QuillEditor";
import {message} from "antd"; 


const ResponseForm = ({ id }) => {
  const [rep_content, setContent] = useState("");
  const [error, setError] = useState();
  const [files, setFiles] = useState();


  // console.log(checkLogin());
  const onEditorChange = (value) =>
  {
    setContent(value);
  } 
  const onFilesChange = (files) => {
    setFiles(files)
}

  const submit = (e) => {
    const token = localStorage.getItem("auth-token");
    const login = true;
    if (token == "") {
      message.error('You must be logged in to perform this action.');

      setTimeout(() => {
         
      }, 2500);
    }

    const newResponse = {
      rep_content,
    };
    // console.log(id);
    axios
      .post("/posts/respond/" + id, newResponse, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => console.log(res.data))
      .catch((err) => err.response.data.msg && setError(err.response.data.msg));
  };

  return (
    <Fragment>
      <div className="container">
        <form onSubmit={submit}>
          <h4 className="label text-primary"> Your answer! </h4>
          {error && (
            <>
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
                link="Sign in here"
              />
            </>
          )}
          {/* <div className="form-group">
            <textarea
              type="text"
              className="form-control full-width"
              id="rep_content"
              placeholder="Content of the response"
              onChange={(e) => setContent(e.target.value)}
            />
          </div> */}
          <div id="ql-editor">
                  <QuillEditor 
                  className="ql-editor"
                    placeholder="Start Posting Something"
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                    // onFilesChange={onFilesChange}

                  />
                </div>
                
          <button type="submit" className="btn btn-primary">
            Post your answer
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ResponseForm;
