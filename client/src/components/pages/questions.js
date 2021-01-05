import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "../pages/QuestionItem";
import {message} from "antd"; 
const Questions = () => {
  const [qsts, setQsts] = useState([]);
  const [user, setUser] = useState({});
  
  const key = qsts;
  useEffect(() => {
    message.loading({ content: "Loading...", key });
    axios
      .get("/posts/all")
      .then((res) => {
        setQsts(res.data);
        setTimeout(() => {
          message.success({ content: "Loaded!", key, duration: 1 });
        }, 700);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h1 className="label text-primary">Questions </h1>
        {qsts.map((qst) => (
          <QuestionItem key={qst._id} qst={qst} />
        ))}
      </div>
    </Fragment>
  );
};
export default Questions;
