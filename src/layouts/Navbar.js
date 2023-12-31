import React from 'react';
import { TAB_LIST } from '../utils/types';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from "../services/AuthContext";
import { userLogout } from '../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  
  const getTabList = () =>{ 
    return TAB_LIST.map((tabName, index) => {
      if (index === 0 ) {
        return <a href="#" key={index} className="bg-neutral-700 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">{tabName}</a>
      } else {
        return <a href="#" key={index} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{tabName}</a> 
      }
    });
  };

  const logoutUser = (event) =>{ 
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    dispatch(userLogout(currentUser));
    // dispatch(userLogout(currentUser)).then(response => {
    //   if(response.status == 200) {
    //     setCurrentUser(null)
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("currentUser");
    //   }
    // }).catch(error => {
    //   console.log(error);
    // })
  }

  return (
    <nav className="bg-lime-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/">
                <img className="h-8 w-auto" 
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" 
                  alt="Your Company" />
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {getTabList()}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {
             (currentUser) ? 
              ( 
                <>
                  <button key={'logoutBtn'} className="relative bg-lime-600 rounded-md text-white px-3 py-2 text-sm mx-2" onClick={() => logoutUser()} >Logout</button> 
                  <NavLink to="/users/login" key={'login_link'} className="relative bg-lime-600 rounded-md text-white px-3 py-2 text-sm mx-2" >{currentUser.username}</NavLink> 
                </>
              ) : (
                <>
                  <NavLink to="/users/register" key={'regiter_link'} className="relative bg-lime-600 rounded-md text-white px-3 py-2 text-sm mx-2" >Register</NavLink> 
                  <NavLink to="/users/login" key={'login_link'} className="relative bg-lime-600 rounded-md text-white px-3 py-2 text-sm mx-2" >Login</NavLink> 
                </>
              )
            }
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
            {getTabList()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;