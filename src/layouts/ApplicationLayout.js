import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
  return (
    <>
      <div className="navbar mb-3">
        <Navbar />
      </div>
      <div className="main">
        <Toaster />
        <Outlet />
      </div>
    </>
  );
};

export default ApplicationLayout;