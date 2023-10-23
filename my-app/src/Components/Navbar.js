import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../reducers/UserSlice';
import { logout } from '../reducers/UserSlice';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const user = useSelector((state) => state.user.user);

    const [isLoggedOut, setIsloggedOut] = useState(false);

    // fonction de deconnexion 
    const handleLogout = () => {
        //action de deconnexion
        dispatch(logout());
        //supprimez le token du stockage local ou de la session
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        console.log("token supprimé du stockage"); // verif la suppression du token

        toast.success('Déconnexion effectuée, Revenez vite !');
        console.log("utilisateur déconnecté")

        setIsloggedOut(true); //declencher la redirection une fois deco
    };

    useEffect(() => {
        if (isLoggedOut) {
            //redirige vers la page d'acceuil
            navigate('/');
        }
    }, [isLoggedOut]);


    const { userName } = user || {};

    return (
        <nav className="main-nav">
            <NavLink to='/' className="main-nav-logo" >
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {token ? ( // verifie si l'utilisateur est connecté grace au token
                    <>
                        <i className='fa fa-user-circle small-icon'><span className='user-name'>{userName}</span></i>
                        <NavLink onClick={handleLogout} className="main-nav-item">
                            <i className="fa fa-sign-out small-icon"></i>
                            Sign Out
                        </NavLink>
                    </>
                ) : (<NavLink to="/Login" className="main-nav-item">
                    <i className="fa fa-user-circle small-icon"></i>
                    Sign In
                </NavLink>
                )}
            </div>
        </nav>
    )
}

export default Navbar;