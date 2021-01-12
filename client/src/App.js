import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/header";
import home from "./components/layout/home";
import login from "./components/auth/login";
import register from "./components/auth/reg";
import "./components/layout/style.css";
import "./components/pages/pages.css";
import "./components/pages/searchBar.css";
import UserContext from "./context/UserContext";
import QuestionContext from "./context/QuestionContext";

import Post_question from "./components/pages/post_question";
import Questions from "./components/pages/questions";
import Question from "./components/Question/Question";

export default function App() {
  const getQuestion = () => {};

  const [questionData, setQuestionData] = useState();

  useEffect(() => {}, [questionData]);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined, //user
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("/user/verifytoken", null, {
        headers: { "auth-token": token },
      });

      if (tokenRes.data) {
        const userRes = await Axios.get("/user/", {
          headers: {
            "auth-token": token,
          },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();

    const getQuestions = async () => {
      Axios.get("/posts/all")
        .then((res) => {
          setQuestionData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getQuestions();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <QuestionContext.Provider value={{ questionData, setQuestionData }}>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/register" component={register} />
              {/* check logged in */}
              <Route path="/posts/ask" component={Post_question} />
              <Route path="/posts/all" component={Questions} />
              <Route path="/posts/:id" component={Question} />
            </Switch>
          </QuestionContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
