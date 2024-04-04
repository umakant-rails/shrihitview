import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import {createAuthor, createSampradaya, newAuthor} from "../../../actions/user/user_authors";

const authorObj = {name: '', name_eng: '', sampradaya_id: '', biography: ''};

const AddAuthor = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(authorObj);
  const [sampradaya, setSampradaya] = useState('');
  const [sampradayaFormDisplay, setSampradayaFormDisplay] = useState(false);
  const { sampradayas, author, sampradayaCreated } = useSelector( (state) => state.userAuthor)

  useEffect( () => {
    dispatch(newAuthor());  
  }, [dispatch]);

  useEffect( () => {
    if(author){resetForm();/*navigate('/articles/new');*/ } 
    if(sampradayaCreated){
      setSampradayaFormDisplay(false);
    }
  }, [author, sampradayaCreated]);

  const createNewSampradaya = () => {
    if(sampradaya){
      dispatch(createSampradaya(sampradaya));
    }
  }
  
  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(authorObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onAuthorSubmit = (event) => {
    event.preventDefault();
    dispatch(createAuthor(formValues));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
        रचनाकार फॉर्म
        </div>
        <form className="py-5 px-5" onSubmit={onAuthorSubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                नाम (हिंदी) <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <ReactTransliterate
                value={formValues.name || ''}
                onChangeText={(text) => { setFormValues(formValues => ({...formValues, name: text})) }}
                lang={'hi'}
                type="text"
                className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 
                  rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>
            <div className="col-span-6">
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
                  dark:shadow-sm-light`} required />
            </div>
          </div>
          <div className='grid md:grid-cols-12 mb-3'>
            {
              sampradayaFormDisplay ? (
                <>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    सम्प्रदाय फॉर्म
                    </label>
                  </div>
                  <div className='col-span-8 mr-5'>
                    <ReactTransliterate
                      value={sampradaya || ''}
                      onChangeText={(text) => {setSampradaya(text); }}
                      lang={'hi'}
                      type="text"
                      className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 
                        rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    />
                  </div>
                  <div className='col-span-2'>
                    <button type="button" 
                      onClick={() => createNewSampradaya()}
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 
                        py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800`}>
                      सम्प्रदाय बनाये
                    </button>
                  </div>
                  <div className='col-span-2'>
                    <button type="button" 
                      onClick={() => setSampradayaFormDisplay(false)}
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 
                        py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800`}>
                      सम्प्रदाय सूची प्रदर्शित करे
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      सम्प्रदाय
                    </label>
                  </div>
                  <div className='col-span-10 mr-5'>
                    <select id="sampradaya_id" name="sampradaya_id" 
                      value={formValues.sampradaya_id || ''}
                      onChange={onInputChange}
                      className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                        rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                        dark:shadow-sm-light`}>
                        <option value="">सम्प्रदाय चुने</option>
                        {
                          sampradayas && sampradayas.map( (sampradaya, index) => 
                            <option key={index} value={sampradaya.id}>{sampradaya.name}</option>
                          )
                        }
                    </select>
                  </div>
                  <div className='col-span-2'>
                    <button type="button" 
                      onClick={() => setSampradayaFormDisplay(true)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      नया सम्प्रदाय टाइप करे
                    </button>
                  </div>
                </>
              ) 
            }
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <Editor  name="biography" 
              value={formValues.biography}
              onTextChange={ e => { 
                setEditorValues('biography', e.htmlValue);} 
              }
              style={{ height: '220px', fontSize: '16px'}} />
          </div>
          <div className='mb-3'>
            <button type="submit" 
              className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              रचनाकार जोड़े
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

export default AddAuthor;