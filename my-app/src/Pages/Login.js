import React from 'react';
import './Login.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Form from '../Components/Form';


const Login = () => {
    return (
        <div>
            <Navbar />
            <main className="main bg-dark">
                <Form />
            </main>
            <Footer />
        </div>
    )
}

export default Login