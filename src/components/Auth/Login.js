import React from 'react';
import { Link } from 'react-router-dom';
import shricharan from "../../images/shricharan.png";

const Login = () => {
  return (
    <div>
      <div className='grid grid-cols-12 gap-4 mt-36'>
        <div className='col-start-1 col-span-8'>
          <img src={shricharan} alt="img" className="rounded-xl" />
        </div>  
        <div className='col-span-3 px-4 py-7 border border-gray-500 rounded-md shadow-2xl shadow-gray-400'>
          <form className="max-w-md mx-auto">
            <div className="text-xl text-center font-bold border-b-2 py-3 mb-5">Login To Your Account</div>
            <div className="relative z-0 w-full mb-5 group">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" name="email" id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
            </div>
            <div className="grid justify-items-stretch">
              <button type="submit" className="justify-self-center text-white bg-blue-700 hover:bg-blue-800 border-1 border-blue-900 font-medium py-3 rounded-md w-full">Login</button>
            </div>
          </form>
          <hr/>
          <div className='py-2 text-md'>
          If you are not registered? Please Registered <Link to="/login" className='text-blue-500'>here</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;