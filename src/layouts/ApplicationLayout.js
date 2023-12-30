import React from 'react';
import Navbar from './Navbar';
//import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";


const ApplicationLayout = () => {
  return (
    <>
      <div className="navbar mb-3">
        <Navbar />
      </div>
      <div className="main">
        {/* <Toaster>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== 'loading' && (
                    <button onClick={() => toast.dismiss(t.id)}>x</button>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>; */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        <Outlet />
      </div>
    </>
  );
};

export default ApplicationLayout;