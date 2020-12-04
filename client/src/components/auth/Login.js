import React ,{Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../auth/auth.css';
import {Link} from "react-router-dom"
function Login() {
    return (
        <Fragment>
            <section className="auth">
                <h1><i className="fab fa-user"></i>Log In</h1>
                <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
               
                    <button type="submit" class="btn btn-primary">Log in</button>
                </form>
                <p className='my-1'>
                    Don't have an account?
                    <Link to='/register'> Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Login
