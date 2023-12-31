import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
//import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from "react-router-dom";
import { clearMessage } from '../actions/message';

const ApplicationLayout = () => {
  const { type, message } = useSelector((state) => state.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    if(message !== undefined && type === "error"){
      toast.error(message);
      dispatch(clearMessage());
    } else if(message !== undefined && type === "success"){
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [type, message]);

  // useEffect(() => {
  //   dispatch(clearMessage()); // clear message when changing location
  // }, [dispatch, navigate]);

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