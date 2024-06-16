import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import {editScripture, updateScripture} from '../../../slices/admin/adminScriptureSlice';
import { useNavigate, useParams } from 'react-router';

const scriptureObj = {scripture_type_id: '', author_id: '', name: '', name_eng: '', description: ''};

const EditScripture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState(scriptureObj);
  const { scripture, scripture_types, authors, updated_scripture } = useSelector( (state) => state.adminScripture)

  useEffect( () => {
    dispatch(editScripture(id));
  }, [dispatch, id]);

  useEffect( () => {   
    if(updated_scripture){navigate('/admin/scriptures'); } 
  }, [updated_scripture, navigate]);

  useEffect( () => {
    if(scripture){
      setFormValues(formValues => ({
        ...formValues,
        scripture_type_id: scripture.scripture_type_id, 
        author_id: scripture.author_id,
        name: scripture.name, 
        name_eng: scripture.name_eng, 
        description: scripture.description
      }))
    }
  }, [scripture]);

  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(scriptureObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onScriptureSubmit = (event) => {
    event.preventDefault();
    dispatch(updateScripture({id: id, form: formValues}));
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी/ग्रन्थ फॉर्म
        </div>
        {
        <form className="py-5 px-5" onSubmit={onScriptureSubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रसिक वाणी/ग्रन्थ का प्रकार <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <select id="scripture_type_id" name="scripture_type_id" 
                value={formValues.scripture_type_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">रसिक वाणी/ग्रन्थ का प्रकार चुने</option>
                  {
                    scripture_types && scripture_types.map( (scripture, index) => 
                      <option key={index} value={scripture.id}>{scripture.name}</option>
                    )
                  }
              </select>
            </div>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                लेखक
              </label>
              <select id="author_id" name="author_id" 
                value={formValues.author_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">लेखक चुने</option>
                  {
                    authors && authors.map( (author, index) => 
                      <option key={index} value={author.id}>{author.name_eng}/{author.name}</option>
                    )
                  }
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                नाम <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <ReactTransliterate
                value={formValues.name}
                onChangeText={(text) => { setEditorValues('name', text) }}
                lang={'hi'}
                type="text"
                className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 
                  rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                नाम (अंग्रेजी) <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <input id="name_eng" name="name_eng" 
                value={formValues.name_eng || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} />
            </div>
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              विवरण
            </label>
            <Editor value={formValues.description} 
              name="interpretation" 
              onTextChange={(e) => {
                setEditorValues('description', e.htmlValue);
              }} 
              style={{ height: '220px', fontSize: '16px'}} />
          </div>
          <div className='mb-3'>
            <button type="submit" 
              className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              रसिक वाणी/ग्रन्थ जोड़े
            </button>
            <button type="button" onClick={onCancel}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              रद्द करें
            </button>
          </div>
        </form>
        }
      </div>
    </div>
  );
};

export default EditScripture;