import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import QuestionItem from "../pages/QuestionItem";
import Pagination from "./pagination";
import 'bootstrap/dist/css/bootstrap.min.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import './pages.css'
import SideBar from "../layout/SideBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import QuestionList from "./questionsList";
const inputstyle = {
  marginTop: "40px",
  width: "70vw",
  height: "40px",
  fontSize: "20px",
  paddingLeft: "10px",
  margin: "autp",
};

const active ={
  active : true
}
const Questions = () => {
  const [qsts, setQsts] = useState([]);
  const [filtredQuestions,setfiltredQuestions]=useState(qsts)
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [active,setActive] = useState(false)
  const key = qsts;

  useEffect(() => {
    message.loading({ content: "Loading...", key });
    axios
      .get("/posts/all")
      .then((res) => {
        setQsts(res.data);
        setfiltredQuestions(res.data)
        setTimeout(() => {
          message.success({ content: "Loaded!", key, duration: 1 });
        }, 700);
      })
      .catch((err) => console.log(err));
  }, []);

  const questionsByFilter = (e)=>{
   if(e==='unanswred')
   { const filtredbyanswer = qsts.filter(qst => qst.responses.length<=0)
 
    setfiltredQuestions(filtredbyanswer)
    setActive(true)
   }

    if(e==='answred'){
      const filtred = qsts.filter(qst => qst.qst_likes.length>2)
 
      setfiltredQuestions(filtred)
   
    }
    if(e==='newest'){
      setfiltredQuestions(qsts)
    }
    
  }
  const loadmore = () => {
    setVisible(qsts.length);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = qsts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);





  return (
   
    <Fragment>
      <div className='app'>
      <SideBar/>
     
      </div>
      
    </Fragment>
  );
};
export default Questions;
