import React ,{Fragment, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../auth/auth.css';
import {Link} from "react-router-dom";
import {login} from './../actions/auth';
function Login({login}) {
    const [formData,setformData] = useState({email:"",password:""})
    const [error,setError] = useState("")
    const [email,password] = formData

    const login = details =>{
        console.log(details)
    }
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const login = e =>{
        e.preventDefault();
        login({email,password})
    }
    return (
        <Fragment>
            <section className="auth">
                <h1><i className="fab fa-user"></i>Log In</h1>
                <form submit={e => login(e)}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => onChange(e)} value={email}/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => onChange(e)} value={password}/>
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
