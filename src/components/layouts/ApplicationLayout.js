import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
//import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useLocation } from "react-router-dom";
import Footer from './Footer';
// import { IStaticMethods } from "preline/preline";
import { initFlowbite } from 'flowbite'

// interface window {
//   HSStaticMethods: IStaticMethods;
// }

const ApplicationLayout = () => {
  const { type, message } = useSelector((state) => state.msg);
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect( () => {
  //   let isLoaded = true;
  //   setInterval(()=> { if(isLoaded){ initFlowbite();isLoaded = false;} }, 500);
  // }, [])

  useEffect(() => {
    // window.HSStaticMethods.autoInit();
    initFlowbite();
  }, [location]);

  useEffect(()=> {
    if(message !== undefined && type === "error"){
      toast.error(message);
    } else if(message !== undefined && type === "success"){
      toast.success(message);
    }
  }, [dispatch, type, message]);

  return (
    <>
      <div className="navbar mb-24">
        <Navbar />
      </div>
      <div className="main py-5 mt-4 min-h-[700px] px-10">
        <div className='grid grid-flow-row md:grid-cols-12 gap-4'>
          <div className='md:col-start-2 md:col-span-10'>
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
              autoClose={3000}
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
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ApplicationLayout;