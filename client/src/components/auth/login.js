import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Fragment } from "react";
import Axios from "axios";
import { message } from "antd";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const loginUser = { email, password };
      //* Here we call an instance of the server route that will proceed the request of type post
      //*using */
      const loginRes = await Axios.post("/user/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user.id,
      });

      message.success("Welcome back");

      setTimeout(() => {}, 2000);

      localStorage.setItem("auth-token", loginRes.data.token);

      history.push("/");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);

      
      message.error(err.response.data.msg);

      setTimeout(() => {}, 2500);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <section className="auth">
          <h1 className="label text-primary">Log In</h1>

          <form onSubmit={submit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
          <p className="my-1">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
          </p>
        </section>
      </div>
    </Fragment>
  );
}
