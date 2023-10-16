import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    // Vérifiez l'authentification ici avec le token
    const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;