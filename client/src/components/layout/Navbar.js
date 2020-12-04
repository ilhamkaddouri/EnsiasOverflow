import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../layout/layout.css'
import logo from '../../images/1.png'
export const  Navbar = ()=> {
    
    return (
        <nav class="navbar navbar-expand-lg">
           <h1>
                <Link to='/'>
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </h1>
           
        </nav>
    );
}

export default Navbar
