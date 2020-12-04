import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../layout/layout.css'
export const  Navbar = ()=> {
    
    return (
        <nav class="navbar navbar-expand-lg bg-light">
           <h1>
                <Link to='/'>
                    EnsiasOverflow
                </Link>
            </h1>
           
        </nav>
    );
}

export default Navbar
