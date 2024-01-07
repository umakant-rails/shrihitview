import React from 'react';
import { TAB_LIST } from '../../utils/types';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from "../../services/AuthContext";
import { userLogout } from '../../actions/auth';
import logo from "../../assets/images/hitlalju.png"

const Navbar = () => {
  const dispatch = useDispatch();
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  
  const getTabList = () =>{ 
    return TAB_LIST.map((tab, index) => {
      // if (index === 0 ) {
      //   return(
      //     <li>
      //       <a href="#" key={index} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
      //         {tabName}
      //       </a>
      //     </li>
      //   );
      // } else {

        return(
          <li key={index} >
            <NavLink to={tab.url} className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {tab.label}
            </NavLink>
          </li>
        );
      //}
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
    <nav className="bg-blue-800 fixed top-0 w-full z-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b-2 border-gray-400 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse m-2">
          <img className="h-12 w-12 w-auto rounded-full" 
            src={logo}
            alt="श्रीहित" />
            <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
              श्रीहित
            </span>
        </NavLink>
        <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            { getTabList() }
            {
             (currentUser) ? 
              ( 
                <>
                  <li>
                    <NavLink to="#" button key={'logoutBtn'} 
                      className="relative bg-red-500 rounded-md text-white px-3 py-2 text-sm mx-2"
                      onClick={() => logoutUser()} >
                      Logout
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/login" 
                    key={'login_link'} 
                    className="relative bg-blue-500 rounded-md text-white px-3 py-2 text-sm mx-2" 
                    >
                      {currentUser.username}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/users/register" key={'regiter_link'} className="relative bg-blue-500 rounded-md text-white px-3 py-2 text-sm mx-2" >Register</NavLink> 
                  </li>
                  <li>
                    <NavLink to="/users/login" key={'login_link'} className="relative bg-blue-500 rounded-md text-white px-3 py-2 text-sm mx-2" >Login</NavLink> 
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;