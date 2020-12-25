import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/header";
import home from "./components/pages/home";
import login from "./components/auth/login";
import register from "./components/auth/reg";
import "./components/layout/style.css";
import "./components/pages/pages.css";
import UserContext from "./context/UserContext";
import Post_question from "./components/pages/post_question";

export default function App() {

 

    const [userData,setUserData] = useState({
        token : undefined,
        user : undefined, //user email
    });


    useEffect(() => {
        const checkLoggedIn = async () => {
         let token = localStorage.getItem("auth-token");
         if (token===null)
         {
             localStorage.setItem("auth-token", "");
             token = "";
         }
         const tokenRes = await Axios.post(
             "http://localhost:5000/api/user/verifytoken",
             null,
             {headers : { "auth-token": token}}
         );
         console.log(tokenRes.data);
         if (tokenRes.data)
         {
             const userRes = await Axios.get("http://localhost:5000/api/user/",
             {headers : {
                 "auth-token" : token},
             });
             setUserData({
                 token,
                 user : userRes.data,
             })
            
         }
         };
    
        checkLoggedIn();
      }, []);

  return (
    <>

<BrowserRouter>
<UserContext.Provider value={{ userData, setUserData}}>
      <Header></Header>
     
        <Switch>
          <Route exact path="/" component={home} />
          <Route path="/login" component={login} />
          <Route path="/register" component={register} />
          <Route path="/posts/ask" component={Post_question}/>
        </Switch>
        
        </UserContext.Provider>
      </BrowserRouter>

    
    </>
  );
}


