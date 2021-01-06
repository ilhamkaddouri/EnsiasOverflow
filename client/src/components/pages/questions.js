import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "../pages/QuestionItem";
const inputstyle={
    marginTop : '40px',
    width: "70vw",
    height: "40px",
    fontSize: "20px",
    paddingLeft: '10px',
    margin:'autp' 
}
function Questions() {
  const [qsts, setQsts] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(3);

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

  return (
    <Fragment>



      <div className="container">
        <div>
          <input type='text' placeholder='search' style={inputstyle} onChange={Event => setSearchItem(Event.target.value)} />
        </div>
        <h1 className="label text-primary">Questions </h1>

        {qsts.filter((qst) => {
          if (searchItem === '') {
            return qst;
          } else if (qst.qst_title.toLowerCase().includes(searchItem.toLowerCase())) {
            return qst;
          }
        }).slice(0, visible).map((qst) => (

          <QuestionItem key={qst._id} qst={qst} />
        ))}

        <div>
          {visible < qsts.length &&
            <button className='btn btn-success' onClick={loadmore}>See more</button>}

        </div>
      </div>
    </Fragment>
  );
}
export default Questions;
