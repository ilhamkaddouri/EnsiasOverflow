import React, { Fragment } from 'react'
import Register from '../auth/Register'
import Footer from './Footer'

function Landing() {
    return (
        <Fragment>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg logan">
                        <h1 className="label">Bienvenu au EnsiasOverflow</h1>
                        <p>Votre propre monde professionel</p>
                    </div>
                    <div class="col-lg">
                        <Register/>
                    </div>
                </div>  
            </div>
            <Footer/>
        </Fragment>
        
    )
}

export default Landing
