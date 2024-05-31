import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSuggestion } from '../../../slices/public/suggestionSlice';
import { Editor } from 'primereact/editor';

const suggestionObj = {
  title: '', 
  description: '', 
  paksh: '',  
  email: '', 
  username: '',
}
const PBAddSuggestion = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(suggestionObj);
	const { suggestion } = useSelector( state => state.suggestion);

  useEffect( () => {
    if(suggestion){
      setFormValues(suggestionObj);
      window.location = '/pb/suggestions';
    }
  }, [suggestion]);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(createSuggestion(formValues));
  }

	return (
		<div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5 pb-8'>
        <div className={`bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 
          shadow-xl mb-3 font-bold`}>
          सुझाव फॉर्म
        </div>
        <form onSubmit={onsubmit} >
          <div className='grid md:grid-cols-4 gap-6 py-4 mb-4'>
            <div className='col-span-3'>
              <div className="mb-2">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  ई-मेल
                </label>
                <input type="text" datepicker="true" id="date-picker-id" name="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500`} placeholder="ई-मेल"
                  value={formValues.email || ''} onChange={onInputChange } />
              </div>
              <div className="mb-2">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  नाम
                </label>
                <input type="text" datepicker="true" id="date-picker-id" name="username"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500`} placeholder="नाम"
                  value={formValues.username || ''} onChange={onInputChange } />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  सुझाव शीर्षक
                </label>
                <input type="text" datepicker="true" id="date-picker-id" name="title"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500`} placeholder="शीर्षक"
                  value={formValues.title || ''} onChange={onInputChange } />
              </div>
              <div className="mb-10">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  विवरण
                </label>
                <Editor  name="content" 
                  value={formValues.content}
                  onTextChange={ e => { setFormValues(formValues => ({...formValues, description: e.htmlValue}))} 
                  }
                  style={{ height: '220px', fontSize: '16px'}} />
              </div>
              <div className='mb-2 pt-2'>
                <button type="submit" 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  सुझाव जोड़े
                </button>
                <button type="button" 
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
		</div>
	);
};

export default PBAddSuggestion;