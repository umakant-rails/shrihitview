import React, { useEffect, useState } from 'react';
import { ReactTransliterate } from 'react-transliterate';
import { PANCHANG_TYPES } from '../../../utils/types';
import { createPanchang } from '../../../slices/admin/adminPanchangSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const calendarObj = {
  title: '', 
  description: '', 
  panchang_type: '', 
  vikram_samvat: '', 
  is_tithi_populated: ''
};

const AddPanchang = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(calendarObj);
  const { panchang } = useSelector( state => state.adminPanchang);
  
  useEffect( () => {
    if(panchang){ navigate('/admin/panchangs'); }
  }, [navigate, panchang]);


  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(calendarObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPanchang(formValues))
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          पंचांग फॉर्म
        </div>
        <form id="panchange-form" onSubmit={onSubmit}>
          <div className='grid md:grid-cols-3 gap-6 mb-5 px-5'>
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <ReactTransliterate
                value={formValues.title || ''}
                onChangeText={(text) => { setFormValues(formValues => ({...formValues, title: text})) }}
                lang={'hi'}
                type="text"
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                पंचांग का प्रकार
              </label>
              <select id="panchang_type" name="panchang_type" 
                value={formValues.panchang_type || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required>
                  <option value="">पंचांग चयन करे</option>
                  {
                    PANCHANG_TYPES.map( (panchang, index) => 
                      <option key={index} value={panchang}>{panchang}</option>
                    )
                  }
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                विक्रम सम्वत
              </label>
              <input id="vikram_samvat" name="vikram_samvat" 
                type ="number"
                value={formValues.vikram_samvat || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                विवरण
              </label>
              <ReactTransliterate
                value={formValues.description}
                onChangeText={(text) => {setFormValues(formValues => ({...formValues, description: text})) }}
                renderComponent={(props) => <textarea  
                  {...props} 
                />}
                rows="3"
                className={`block p-2.5 w-full mb-2 text-sm text-gray-900 bg-gray-50 rounded border-b 
                  border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500`}
                lang={'hi'}
              />
            </div>
          
            <div className='col-span-2 mb-5'>
              <button type="submit" 
                className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                पंचांग जोड़े
              </button>
              <button type="button" onClick={onCancel}
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                रद्द करें
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPanchang;