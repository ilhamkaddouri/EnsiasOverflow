import React, { useState, useEffect, useContext} from "react";
import QuestionItem from "../pages/QuestionItem";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/options";
import img from "../../components/images/1.png";
import Axios from "axios";
import QuestionContext from "../../context/QuestionContext"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../components/pages/pages.css';
export default function Header() {

  const [searchItem, setSearchItem] = useState("");
  // const [questionData, setQuestionData] = useState();

  // useEffect(() => {
  //   Axios.get("/posts/all")
  //     .then((res) => {
  //       setQuestionData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

 
    /**
   * QuestionContext TEST
   */

  const questions_data = useContext(QuestionContext)
  console.log();
  const qsts = questions_data.questionData;
  


  return (
    <header id="header">
      <Link className="title" to="/">
        <img src={img} width="150" height="50" />
      </Link>

      {/* <div>
          <input className="form-control head"
            id="SearchBar"

            type="text"
            placeholder="Search..."
            // style={inputstyle}
            // onChange={(Event) => setSearchItem(Event.target.value)}
          />
          
         <span><i className=""><FontAwesomeIcon icon={faSearch} /></i></span>
          
        </div> */}

      <div class="input-group md-form form-sm form-2 pl-0 head">
        <input
          class="form-control my-0 py-1 red-border"
          type="text"
          placeholder="Search"
          aria-label="Search"
        onChange={(Event) => setSearchItem(Event.target.value)}
        />
        <div class="input-group-append">
          <span class="input-group-text red lighten-3" id="basic-text1">
            <i aria-hidden="true">
            <FontAwesomeIcon icon={faSearch}/>

            </i>
          </span>
        </div>
      </div>

      {/* {qsts
          .filter((qst) => {
            if (searchItem === "") {
              return qst;
            } else if (
              qst.qst_title.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return qst;
            }
          })
          .map((qst) => (
            <div>
            {qst.qst_title}
             </div>
          ))} */}

      <AuthOptions></AuthOptions>
    </header>
  );
}
