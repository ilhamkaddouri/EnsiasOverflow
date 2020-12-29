import React, { Fragment, useState} from "react";
import Card from "react-bootstrap/Card";
import axios from 'axios'
const ResponseItem =({response,questionId}) => {
  const [isLiked, updateLike] = useState(false);
    const handleLike = () => {
        
        const id = response._id;
        axios.put('http://localhost:5000/api/posts/like/'+questionId+'/responses/'+id, 
        null, 
        { headers: { "auth-token": localStorage.getItem("auth-token") } })
        .then(res => { console.log(res.data) })
        .catch(err => console.log(err))
        console.log(id);
    }

    const handleDislike = () => {
        
      const id = response._id;
      axios.put('http://localhost:5000/api/posts/unlike/'+questionId+'/responses/'+id, 
      null, 
      { headers: { "auth-token": localStorage.getItem("auth-token") } })
      .then(res => { console.log(res.data) })
      .catch(err => console.log(err))
      console.log(id);
  }
    return (
        <Fragment>
      <Card style={{ width: "70vw" , margin:'5px', borderColor:'black'}} >
        <Card.Body>
        
          <Card.Subtitle className="mb-2 text-muted">
            Asked by :<Card.Link href="#LinktoUser"> ilham</Card.Link>
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted">
            {" "}
            On : {response.rep_date.substring(0, 10)}{" "}
          </Card.Subtitle>
          <Card.Text>{response.rep_content}</Card.Text>
          <div className="ml-auto">
            <button type="button" className="btn btn-success mr-2" value={response._id} onClick={handleLike} >
              <i className="fa fa-thumbs-up"></i>{" "}
         {response.rep_likes.length> 0 && <span>{response.rep_likes.length}</span>}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDislike}>
              <i className="fa fa-thumbs-down"></i> 
            </button>
           
          </div>
        </Card.Body>
      </Card>
    </Fragment>
    )
}

export default ResponseItem
