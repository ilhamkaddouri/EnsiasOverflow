import React,{Fragment} from 'react'
import '../auth/auth.css';
import {Link} from "react-router-dom"
function Register() {
    return (
        <Fragment>
            <section className="auth">
                <h1 className="label">Sign Up</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i> Sign Into Your Account
                </p>
                <form>
                <div className="form-group">
                    <label for="exampleInputusername">Username</label>
                    <input type="text" class="form-control" id="exampleInputusername" placeholder="username"/>
                   
                </div>
                <div className="form-group">
                    <label for="exampleInputnom">Nom</label>
                    <input type="text" class="form-control" id="exampleInputnom" placeholder="Kaddouri"/>
                    
                </div>
                <div className="form-group">
                    <label for="exampleInputprenom">Prenom</label>
                    <input type="text" class="form-control" id="exampleInputprenom" placeholder="Ahmed"/>
                   
                </div>
                <div className="form-group">
                    <label for="exampleInputemail">Email</label>
                    <input type="email" class="form-control" id="exampleInputemail" placeholder="email@gmail.com"/>
                   
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="******"/>
                </div>
                
                <button type="submit" className="btn">Sign up</button>
                </form>
                <p >
                    Already have an account?
                    <Link to='/login'> Sign in</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default Register
