import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shricharan from "../../images/shricharan.png";
import { useDispatch,useSelector } from 'react-redux';
//import  toast  from 'react-hot-toast';
import { toast } from 'react-toastify';
import { userRegister } from '../../actions/auth';


// https://merakiui.com/components
// flowbite css
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObj = {email:'', username: '', password: '', confirm_password: ''};
  const [formValues, setFormValues] = useState(userObj);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const {message, statusCode} = useSelector( (state) => state.auth);
  
  useEffect(() => {
    if(statusCode === 200){
      toast.success(message);
      navigate("/users/login");
    }else if (statusCode === 401) {
      toast.error(message);
    }
  }, [statusCode, message]);

  // useEffect(() => {
  //   let errors = [];
  //   if(Object.keys(formErrors).length > 0){
  //     for (const [key, value] of Object.entries(formErrors)) {
  //       errors.push(value);
  //     }
  //     toast.error(errors.join("\n"))
  //     setIsSubmit(false);
  //   }
  // }, [formErrors]);


  const onInputChange = (event) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  }
  
  const validateForm = (formValues) => {
    const errors = {};
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if(formValues.username.length === 0 || formValues.username === ''){
      errors.username =  "Username is mandatory field.";
    }
    
    if(formValues.email.length === 0 || formValues.email === ''){
      errors.email = "Email is mandatory field.";
    } else if(!emailRegex.test(formValues.email)){
      errors.email = "Email must be in proper format.";
    }

    if(formValues.password.length === 0 || formValues.password === ''){
      errors.password = "Password is mandatory field.";
    } else if(formValues.password.length < 8){
      errors.password = "Password must be contain at least 8 characters.";
    }

    if(formValues.confirm_password.length === 0 || formValues.confirm_password === ''){
      errors.confirm_password = "Confirm Password is mandatory field.";
    }

    if(errors.password !== '' && errors.confirm_password !== ''
      && formValues.password !== formValues.confirm_password ){
      errors.confirm_password = "Password and Confirm Password must be same.";
    }
    return errors;
  }

  const onFormSubmit = async (event) =>{
    event.preventDefault();

    let errors = await validateForm(formValues);

    if(Object.keys(errors).length === 0){
      console.log("form submit")
      //dispatch(userRegister(formValues))
    } else if (Object.keys(errors).length > 0) {
      let errorMsgs = [] 
      for (const [key, value] of Object.entries(errors)) {
        errorMsgs.push(value);
      }
      toast.error(errorMsgs.join("\n"))
      setIsSubmit(false);
    }
  }

  return (
    <div className='grid grid-flow-row lg:grid-cols-12 md:grid-cols-12 gap-4 mt-24'>
      <div className='lg:col-start-2 lg:col-span-7 md:col-start-2 md:col-span-7 flex justify-center items-center'>
        <img src={shricharan} alt="img" className="rounded-xl object-cover" />
      </div> 
      <div className='lg:col-span-3 md:col-span-3 px-4 py-7 border border-gray-500 rounded-md shadow-2xl shadow-gray-400'>
        <form onSubmit={onFormSubmit} className="max-w-md mx-auto">
          <div className="text-xl text-center font-bold border-b-2 py-3 mb-5">
            Create Your Account
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input 
              type="text" 
              key="email" 
              name="email" 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Email" 
              onChange={onInputChange}
              value = {formValues.email} 
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input 
              type="text" 
              key="username" 
              name="username" 
              id="username" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Username" 
              onChange={onInputChange}
              value = {formValues.username}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
              type="password" 
              key="password" 
              name="password" 
              id="password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              onChange={onInputChange}
              value = {formValues.password}
               
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input 
              type="password" 
              key="confirm_password" 
              name="confirm_password" 
              id="confirm_password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              onChange={onInputChange}
              value = {formValues.confirm_password}
               
            />
          </div>
          <div className="grid justify-items-stretch">
            <button 
              type="submit" 
              className="justify-self-center text-white bg-blue-700 hover:bg-blue-800 border-1 border-blue-900 font-medium py-3 rounded-md w-full">
              Register
            </button>
          </div>
        </form>
        <hr/>
        <div className='py-2 text-md'>
          If you registered already? Please login <Link to="/login" className='text-blue-500'>here</Link>.
        </div>
      </div>
    </div>
  );
};

export default Register;