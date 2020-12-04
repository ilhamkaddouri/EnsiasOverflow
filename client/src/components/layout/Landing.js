import React from 'react'
import Register from '../auth/Register'

function Landing() {
    return (
        <div className="container col-lg-12">
            <section className="col-lg-6">
                <h1 className="label">Bienvenu au EnsiasOverflow</h1>
                <p>Votre propre monde professionel</p>
            </section>
            <section className="col-lg-6">
                <Register/>
            </section>
        </div>
    )
}

export default Landing
