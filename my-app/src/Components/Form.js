import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectToken } from '../reducers/UserSlice';
import { useNavigate } from 'react-router-dom';


const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // etat local pour l'option remember me 
    const [showPassword, setShowPassword] = useState(false);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error("Veuillez remplir tous les champs !");
            return;
        }

        // info d'identification
        const userCredential = {
            email,
            password,
            rememberMe,
        };

        console.log("userCredential avant l'action :", userCredential);

        dispatch(loginUser(userCredential));

    };

    useEffect(() => {
        if (token) {
            setEmail('');
            setPassword('');
            navigate('/Userprofil');
            toast.success("Connection réussie !");
        }
    }, [token]);



    return (
        <section className='sign-in-content'>
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='show-password'
                    >
                        {showPassword ? (
                            <i className='fa fa-eye-slash'></i>
                        ) : (
                            <i className='fa fa-eye'></i>
                        )}
                    </button>
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)} // inverse la valeur de rememberMe lors la modif de la case a cocher 
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button type='submit' className="sign-in-button">Sign In</button>
            </form>


        </section>
    );
};

export default Form;