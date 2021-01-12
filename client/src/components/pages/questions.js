import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import QuestionItem from "../pages/QuestionItem";
import Pagination from "./pagination";
import QuestionContext from "../../context/QuestionContext";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { message } from "antd";
const inputstyle = {
  marginTop: "40px",
  width: "70vw",
  height: "40px",
  fontSize: "20px",
  paddingLeft: "10px",
  margin: "autp",
};
const Questions = () => {
  const [qsts, setQsts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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

  const loadmore = () => {
    setVisible(qsts.length);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = qsts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);





  return (
    <Fragment>
      <div className="container">
        {/* <div>
          <input className="form-control"
          id="SearchBar"
            type="text"
            placeholder="Search..."
            style={inputstyle}
            onChange={(Event) => setSearchItem(Event.target.value)}
          />
          <span class="glyphicon glyphicon-search form-control-feedback"> </span>
        </div> */}

      <br/>
        <div class="input-group md-form form-sm form-2 pl-0 head">
        <input
          class="form-control my-0 py-1 red-border"
          type="text"
          placeholder="Search"
          aria-label="Search"
          placeholder="Search..."
            onChange={(Event) => setSearchItem(Event.target.value)}
        />
        <div class="input-group-append">
          <span class="input-group-text red lighten-3" id="basic-text1">
            <i aria-hidden="true">
            <FontAwesomeIcon icon={faSearch} />

            </i>
          </span>
        </div>
      </div>

<br/>
        

        <h1 className="display-4 title md">Questions </h1>
        {qsts
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
    </Fragment>
  );
};
export default Questions;
