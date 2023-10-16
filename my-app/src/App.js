import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Userprofil from './Pages/Userprofil';
import PrivateRoutes from './Components/PrivateRoute'; import { useDispatch } from 'react-redux';
import { checkRememberMe } from './reducers/UserSlice';


const App = () => {
  const dispatch = useDispatch();

  dispatch(checkRememberMe());


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/Userprofil' element={<Userprofil />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App