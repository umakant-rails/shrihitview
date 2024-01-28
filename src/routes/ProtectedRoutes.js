import React, {useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
//import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const ProtectedRoutes = ({ children }) => {
  // const {currentUser, setCurrentUser} = useContext(AuthContext);
  
 
  const token = localStorage.getItem("token");
  const currentUserObj = localStorage.getItem("currentUser");
  
  if (!currentUserObj) {
    return <Navigate to="/users/login" />;
  }
  return children;

};

export default ProtectedRoutes;