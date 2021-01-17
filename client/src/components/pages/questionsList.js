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
const QuestionList = () => {
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



  let btnA = active ? 'active' : ''

  return (
   
    <Fragment>
    
      <div className="container-fluid ">
      
        <div className='col-lg container'>
        <div class="input-group md-form form-sm form-2 pl-0 head row">
          <input
            class="form-control my-0 py-1 red-border"
            type="text"
            placeholder="Search"
            aria-label="Search"
            placeholder="Search..."
            onChange={(Event) => setSearchItem(Event.target.value)}
          />
          <div class="input-group-append">
            {/* <span class="input-group-text red lighten-3" id="basic-text1">
              <i aria-hidden="true">
              <FontAwesomeIcon icon={faSearch} />

              </i>
            </span> */}
          </div>
        </div>

        
          
        <div className='row'>
            <h1 className="title md">{filtredQuestions.length} Questions </h1>
        </div>
        <div className='row'>
          <div>
            <i  onClick={(e)=>questionsByFilter('newest')} className='btn btn-light active' >Newest</i>
            <i onClick={(e)=>questionsByFilter('answred')} className='btn btn-light'>Most liked</i>
            <i onClick={(e)=>questionsByFilter('unanswred')} className='btn btn-light' >Unanswerd</i>
          
          </div>
        </div>

        {filtredQuestions
          .filter((qst) => {
            if (searchItem === "") {
              return qst;
            } else if (
              qst.qst_title.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return qst;
            }
          })
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((qst) => (
            <QuestionItem key={qst._id} qst={qst} />
          ))}

          {searchItem === "" && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={qsts.length}
              paginate={paginate}
            />
          )}

          {/* <div>
            {visible < qsts.length &&
              <button className='btn btn-success' onClick={loadmore}>See more</button>}
          </div> */}
            </div>
          </div>
        
    </Fragment>
  );
};
export default QuestionList;
