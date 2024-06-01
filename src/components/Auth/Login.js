import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';
import shricharan from "../../assets/images/shricharan.png";
// import { getCurrentUser, userLogin } from '../../actions/auth';
import { getCurrentUser, userLogin } from '../../slices/authSlice';
import { AuthContext } from '../../services/AuthContext';
import { ADMIN_ROLE } from '../../utils/types';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginCredential = {email: '', password: ''};
  const [formValues, setFormValues] = useState(loginCredential);
  const {setCurrentUser} = useContext(AuthContext);
 
  useEffect( () => {
    dispatch(getCurrentUser()).then(response => {
      if(response.data.current_user){
        navigate(-1);
      }
    }).catch( error => error.response);
  }, [dispatch, navigate]);

  const onInputChange = (event) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    if(formValues.email.length === 0 || formValues.password.length === 0) return;
    const response = dispatch(userLogin(formValues));
    response.then( res => {
      const user = res.payload.data.user;
      const role = res.payload.data.role;

      if(user){ setCurrentUser(user);}
      if(ADMIN_ROLE.indexOf(role) >= 0) {
        navigate("/admin/dashboard");
      } else {
        navigate('/articles');
      }
    });
  }


  return (
    <div>
      <div className='grid grid-flow-row md:grid-cols-12 gap-4 mt-20 mb-20'>
        <div className='md:col-start-2 md:col-span-7'>
          <img src={shricharan} alt="img" className="rounded-xl" />
        </div>  
        <div className='md:col-span-3 px-4 py-7 border border-gray-500 rounded-md shadow-2xl shadow-gray-400'>
          <form onSubmit={onFormSubmit} className="max-w-md mx-auto">
            <div className="text-xl text-center font-bold border-b-2 py-3 mb-5">Login To Your Account</div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input 
                type="text" 
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Email"
                onChange={onInputChange}
                value = {formValues.email}
                required 
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="" 
                onChange={onInputChange}
                value = {formValues.password}
                required
              />
            </div>
            <div className="grid justify-items-stretch">
              <button type="submit" className="justify-self-center text-white bg-blue-700 hover:bg-blue-800 border-1 border-blue-900 font-medium py-3 rounded-md w-full">Login</button>
            </div>
          </form>
          <hr/>
          <div className='border-b py-3 border-gray-300 text-blue-500'>
            <Link to="/users/password/forget">Forgotten Password</Link>
          </div>
          <div className='py-2 text-md'>
            If you are not registered? Please Registered <Link key={'login'} to="/users/register" className='text-blue-500'>here</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 