import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const currentUserObj = localStorage.getItem("currentUser");

  if (!currentUserObj) {
    return <Navigate to="/users/unauthrized" replace={true} />;
  }
  return children;

};

export default ProtectedRoutes;