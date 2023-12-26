import React from 'react';
import Navbar from './Navbar';
import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
  return (
    <>
      <div className="navbar mb-3">
        <Navbar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default ApplicationLayout;