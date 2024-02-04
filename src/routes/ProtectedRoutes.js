import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  // const {currentUser, setCurrentUser} = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const currentUserObj = localStorage.getItem("currentUser");

  if (!currentUserObj) {
    return <Navigate to="/users/unauthrized" replace={true} />;
  }
  return children;

};

export default ProtectedRoutes;