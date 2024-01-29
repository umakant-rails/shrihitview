import React, { useEffect, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSideBar from './AdminSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { initFlowbite } from 'flowbite'
//import logo from "../../assets/images/hitlalju.png"
import { AuthContext } from "../../services/AuthContext";
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../actions/message';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { type, message } = useSelector((state) => state.msg);
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  
  useEffect(() => {
    initFlowbite();
  }, [location]);
  
  useEffect(()=> {
    if(message !== undefined && type === "error"){
      toast.error(message);
      dispatch(clearMessage());
    } else if(message !== undefined && type === "success"){
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [type, message]);

  const logoutUser = () =>{ 
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    //dispatch(userLogout(currentUser));
  }

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <AdminSideBar />
        <div className="flex flex-col flex-1 overflow-y-auto sm:ml-64">
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
          <nav className="bg-blue-900 shadow shadow-gray-300 w-100 px-2 md:px-auto">
            <div className="md:h-16 h-16 pr-2 flex items-center justify-between flex-wrap md:flex-nowrap">
              <div className="text-indigo-500 md:order-1">
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" 
                aria-controls="default-sidebar" type="button" 
                  className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
                </button>
              </div>
              <div className="order-2 md:order-3">
                <button type="button" className="flex text-sm focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <svg className="w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  <div className='pt-1 hidden sm:block text-base text-white ml-2'>{currentUser && currentUser.username.toUpperCase()}</div>
                </button>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => logoutUser()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;