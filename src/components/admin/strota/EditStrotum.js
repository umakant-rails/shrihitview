import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import {editStrotum, updateStrotum} from "../../../slices/admin/adminStrotumSlice";
import { useNavigate, useParams } from 'react-router';

const authorObj = {title: '', strota_type_id: '', source: '', keyword: ''};

const EditStroum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState(authorObj);
  const { strotum, strota_types, updated_strotum } = useSelector( (state) => state.adminStrotum)

  useEffect( () => {
    dispatch(editStrotum(id));  
  }, [dispatch, id]);

  useEffect( () => {
    if(strotum){
      setFormValues( formValues => ({
        title: strotum.title,
        strota_type_id: strotum.strota_type_id,
        source: strotum.source,
        keyword: strotum.keyword,
      }))
    }
    if(updated_strotum){navigate('/admin/strota');} 
  }, [strotum, navigate, updated_strotum]);
  
  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(authorObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onStrotaSubmit = (event) => {
    event.preventDefault();
    dispatch(updateStrotum({id: strotum.id, form: formValues}));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          स्त्रोत/आरती फॉर्म
        </div>
        <form className="py-5 px-5" onSubmit={onStrotaSubmit}>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              स्त्रोत/आरती का प्रकार <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <select id="strota_type_id" name="strota_type_id" 
              value={formValues.strota_type_id || ''}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">स्त्रोत/आरती का प्रकार चुने</option>
                {
                  strota_types && strota_types.map( (strota_type, index) => 
                    <option key={index} value={strota_type.id}>{strota_type.name}</option>
                  )
                }
            </select>
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              स्त्रोत/आरती शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <ReactTransliterate
              value={formValues.title}
              onChangeText={(text) => { setEditorValues('title', text) }}
              lang={'hi'}
              type="text"
              className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 
                rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              टिप्पणी/टैग
            </label>
            <ReactTransliterate
              value={formValues.keyword}
              onChangeText={(text) => { setEditorValues('keyword', text) }}
              lang={'hi'}
              type="text"
              className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 
                rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              मूल ग्रन्थ (स्रोत)
            </label>
            <ReactTransliterate
              value={formValues.source}
              onChangeText={(text) => { setEditorValues('source', text) }}
              lang={'hi'}
              type="text"
              className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 
                rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
          <div className='mb-3'>
            <button type="submit" 
              className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              स्त्रोत/आरती जोड़े
            </button>
            <button type="button" onClick={onCancel}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              रद्द करें
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStroum;