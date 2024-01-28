import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../services/AuthContext';
import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import {newArticle} from "../../actions/article";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const AddArticle = () => {
  const dispatch = useDispatch();
  const articleObj = {article_type_id: '', raag_id: '', scripture_id: '', index: '', context_id: '', 
    author_id: '', hindi_title: '', english_title: '', content: '', interpretation: ''
  };
  const [formValues, setFormValues] = useState(articleObj);
  const {currentUser, setCurrentUser} = useContext(AuthContext);  
  //const { createdBlog } = useSelector( (state) => state.blogs)

  useEffect( () => {
    dispatch(newArticle());  
  }, []);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onCancel = event => {
    event.preventDefault(); 
    setFormValues(articleObj);  
  }

  const onArticleSubmit = event => {
    event.preventDefault(); 
    console.log(formValues); 
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना फॉर्म
        </div>
        <form className="py-5 px-10" onSubmit={onArticleSubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रचना का प्रकार <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <input type="text" id="article_type_id" name="article_type_id" 
                value={formValues.article_type_id}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required />
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                राग 
              </label>
              <input type="text" id="raag_id" name="raag_id"
                value={formValues.raag_id}
                onChange={onInputChange} 
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} />
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रसिक वाणी
              </label>
              <input type="text" id="scripture_id" name="scripture_id" 
                value={formValues.scripture_id}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} />
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रसिक वाणी पद अनुक्रम 
              </label>
              <input type="text" id="index" name="index"
                value={formValues.index}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} />
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                प्रसंग
              </label>
              <input type="text" id="context_id" name="context_id"
                value={formValues.context_id}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required/>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                लेखक
              </label>
              <input type="text" id="author_id" name="author_id"
                value={formValues.author_id}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required/>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                हिंदी शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <input type="text" id="hindi_title" name="hindi_title"
                value={formValues.hindi_title}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required />
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                इंग्लिश शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <input type="text" id="english_title" name="english_title"
                value={formValues.english_title}
                onChange={onInputChange} 
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`} required />
            </div>
          </div>
          <div className='grid md:grid-cols-12 mb-3'>
            <div className='col-span-12'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                टैग्स
              </label>
            </div>
            <div className='col-span-10 mr-5'>
              <input type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
            <div className='col-span-2'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                नया टैग टाइप करे
              </button>
            </div>
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <Editor value={formValues.content} name="content" onTextChange={(e) => setFormValues({ ...formValues, ['content']: e.htmlValue }) } style={{ height: '220px' }} />
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना का अर्थ
            </label>
            <Editor value={formValues.interpretation} name="interpretation" onTextChange={(e) => setFormValues({ ...formValues, ['interpretation']: e.htmlValue }) } style={{ height: '220px' }} />
          </div>
          <div className='mb-3'>
            <button type="submit" className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              रचना जोड़े
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

export default AddArticle;