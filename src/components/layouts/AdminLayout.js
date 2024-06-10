import React, { useEffect, useContext, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSideBar from './AdminSideBar';
import { ToastContainer, toast } from 'react-toastify';
import { initFlowbite } from 'flowbite'
//import logo from "../../assets/images/hitlalju.png"
import { AuthContext } from "../../services/AuthContext";
import { useDispatch } from 'react-redux';
import { ADMIN_ROLE, TAB_LIST } from '../../utils/types';
import ContributorSideBar from './ContributorSideBar';
import { getUserRole } from '../../slices/authSlice';


const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);
  const { type, message } = useSelector((state) => state.msg);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    dispatch(getUserRole()).then(response =>{
      setUserRole(response.data.role);
    })
  }, [dispatch]);

  useEffect(() => {initFlowbite();}, [location]);

  useEffect(()=> {
    if(message !== undefined && type === "error"){
      toast.error(message);
    } else if(message !== undefined && type === "success"){
      toast.success(message);
    }
  }, [dispatch, type, message]);

  const getTabList = () =>{ 
    const currentUrl = location.pathname;
    return TAB_LIST.map((tab, index) => {
      return(
        <li key={index} >
          {
            (currentUrl === tab.url) ? (
              <NavLink to={tab.url} className={`relative bg-yellow-500 rounded-md text-white px-3 py-2 text-sm `}>
                {tab.label}
              </NavLink>
            ) : (
              <NavLink to={tab.url} className={`block py-2 px-3 text-white rounded hover:bg-gray-100 
                md:hover:bg-transparent md:border-0 md:hover:text-gray-200 md:p-0 dark:text-white 
                md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                md:dark:hover:bg-transparent`}>
                {tab.label}
              </NavLink>
            )
          }
        </li>
      );
    });
  }

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        { (ADMIN_ROLE.indexOf(userRole)>=0) ? <AdminSideBar /> : <ContributorSideBar /> }
        <div className="flex flex-col flex-1 overflow-y-auto sm:ml-64">
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
          <nav className="bg-blue-900 shadow shadow-gray-300 w-100 px-2 md:px-auto">
            <div className="md:h-16 h-16 p-2 flex items-center justify-between flex-wrap md:flex-nowrap">
              <div className="hidden w-full md:block md:w-auto flex flex-row justify-end" id="navbar-multi-level">
                <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 ms-5 border border-gray-100 
                  rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 
                  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}>
                  {getTabList()}
                </ul>
              </div>
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
                  <div className='pt-1 hidden sm:block text-base text-white ml-2'>
                    {currentUser && currentUser.username.toUpperCase()}
                  </div>
                  <svg className="flex w-5 h-5 mt-1 ms-1 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" d="m19 9-7 7-7-7"/>
                  </svg>
                </button>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="#" 
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white`} role="menuitem">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/users/password_change" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <NavLink to="/users/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Sign out
                      </NavLink>
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