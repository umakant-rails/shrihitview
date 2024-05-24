import React, { useEffect, useState } from 'react';
import { sendPasswordToken } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
// import { AuthContext } from '../../services/AuthContext';
const formObj = {email: ''}
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(formObj);
  const {password_token_sent} = useSelector(state => state.auth) 

  useEffect( () => {
    if(password_token_sent){setFormValues(formObj);}
  }, [password_token_sent]);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(sendPasswordToken(formValues));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
    <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
      <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
        Recover Your Password
      </div>
      <form className="py-5 px-5" onSubmit={onFormSubmit}>
        <div className='grid md:grid-cols-12 gap-6 mb-3'>
          <div className="col-span-6">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Email <span title="required" className="text-red-600 font-bold">*</span>
            </label> 
            <input type="text" id="email" name="email"
              value={formValues.email}
              onChange={onInputChange} 
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
              rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
              dark:shadow-sm-light`} required />
          </div>
        </div>
        <div className='mb-5'>
          <button type="submit" 
            className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Recover Your Password
          </button>
          {/* <button type="button" onClick={onCancel}
            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            रद्द करें
          </button> */}
        </div>
      </form>
    </div>
  </div>
  );
};

export default ForgetPassword;