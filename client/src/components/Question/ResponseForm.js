import React, { Fragment ,useState} from 'react'
import axios from 'axios'
const ResponseForm=({id})=> {

   

    

    const [rep_content, setContent] = useState('');

    
    const submit = async (e) => {
       
        const newResponse ={
          rep_content
        }
        console.log(id)
        axios.post('/posts/respond/'+id,newResponse, { headers: { "auth-token": localStorage.getItem("auth-token") }}).then(res=> console.log(res.data)).catch(err=> console.log(err))
        setContent(' ');
      };

    return (
        <Fragment>
            <div className="container">
            <form onSubmit={submit}>
            <h4 className="label text-primary"> Your answer! </h4> 
            <div className="form-group">
              <textarea
                type="text"
                className="form-control full-width"
                id="rep_content"
                placeholder="Content of the response"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post your answer
            </button>
          </form>
            </div>
        </Fragment>
    )
}

export default ResponseForm
