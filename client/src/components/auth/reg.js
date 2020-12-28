import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
import Footer from "../layout/Footer";

function Register() {
  /** Tracking the states of the form */
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [fname, setFirstName] = useState();
  const [lname, setLastName] = useState();
  const [error, setError] = useState();

  /** Successful registration of account */
  const [success, setSuccess] = useState();

  /** Successful registration of account */
  const { setUserData } = useContext(UserContext);
  // const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username,
        fname,
        lname,
        email,
        password,
        passwordCheck,
      };
      await Axios.post("http://localhost:5000/api/user/register", newUser);

      const loginRes = await Axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.id,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      //  console.log(loginRes.data.user.id);
      if (loginRes.data.token) {
        setSuccess("Account created successfully. Welcome aboard !");
      }
      // history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
    // window.location.reload(false);
    // console.log(loginRes);
  };

  return (
    <Fragment>
      <div className="container">
        <section>
          <h1 className="label text-primary">Sign Up</h1>
          {success && (
            <SuccessNotice
              message={success}
              clearError={() => setSuccess(undefined)}
            />
          )}
      
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}

          <p className="lead">
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="exampleInputusername">Username</label>
              <input
                type="text"
                className="form-control"
                id="reg-username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputLastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="reg-lastname"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputFirstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="reg-firstname"
                placeholder="Jane"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputemail">Email</label>
              <input
                type="email"
                className="form-control"
                id="reg-email"
                placeholder="email@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="reg-password"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="form-control"
                id="reg-password-vf"
                placeholder="Verify Password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </div>

            <button type="submit" value="Register" className="btn btn-primary">
              Register
            </button>
          </form>
          <p>
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>
        </section>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default Register;
