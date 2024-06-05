import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'primereact/editor';

import { useNavigate, useParams } from 'react-router';
import { newScrArticle, createScrArticle } from '../../../slices/admin/adminScrArticleSlice';

const articleObj = {
  scripture_id: '', chapter_id: '', article_type_id: '', 
  index: '', content: '', interpretation: ''};

const AddScrArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {scripture_id} = useParams();

  const [formValues, setFormValues] = useState(articleObj);
  const [chapterList, setChapterlist] = useState([]);
  const { scripture, sections, chapters, article_types, scripture_article } = useSelector( (state) => state.adminScrArticle)

  useEffect( () => {
    dispatch(newScrArticle(scripture_id));
  }, [dispatch, scripture_id]);

  useEffect( () => {
    if(chapters){ setChapterlist(chapters); }
  }, [chapters]);

  useEffect( () => {
    if(scripture_article){
      setFormValues(formValues => ({
        ...formValues,
        index: scripture_article.index+1,
        content: '',
        interpretation: ''
      }));
    } 
  }, [navigate, scripture_article]);
  
  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(articleObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onScriptureSubmit = (event) => {
    event.preventDefault();
    dispatch(createScrArticle({id:scripture.id, form:formValues}));
  }

  const filterChapters = (e) => {
    const sectionId = e.target.value;
    if(sectionId){
      let filteredChapters = chapters.filter((chapter) => chapter.parent_id === sectionId)
      setChapterlist(filteredChapters);
    } else {
      setChapterlist(chapters);
    }
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी/ग्रन्थ ( {scripture ? scripture.name : ''}) रचना फॉर्म
        </div>
        <form className="py-5 px-5" onSubmit={onScriptureSubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                सेक्शन का नाम
              </label>
              <select id="section_id" name="section_id" 
                // value={formValues.chapter_id || ''}
                onChange={filterChapters}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">सेक्शन चुने</option>
                  {
                    sections && sections.map( (section, index) => 
                      <option key={index} value={section.id}>{section.name}</option>
                    )
                  }
              </select>
            </div>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                अध्याय का नाम
              </label>
              <select id="chapter_id" name="chapter_id" 
                value={formValues.chapter_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">अध्याय चुने</option>
                  {
                    chapterList && chapterList.map( (chapter, index) => 
                      <option key={index} value={chapter.id}>{chapter.name}</option>
                    )
                  }
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रचना प्रकार <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <select id="article_type_id" name="article_type_id" 
                value={formValues.article_type_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">रचना प्रकार चुने</option>
                  {
                    article_types && article_types.map( (aType, index) => 
                      <option key={index} value={aType.id}>{aType.name}</option>
                    )
                  }
              </select>
            </div>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रचना का अनुक्रम
              </label>
              <input id="index" name="index" 
                value={formValues.index || ''}
                onChange={onInputChange} type="number"
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} />
                  
            </div>
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <Editor value={formValues.content} 
              name="interpretation" 
              onTextChange={(e) => {
                setEditorValues('content', e.htmlValue);
              }} 
              style={{ height: '180px', fontSize: '16px'}} />
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना का अर्थ <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <Editor value={formValues.interpretation} 
              name="interpretation" 
              onTextChange={(e) => {
                setEditorValues('interpretation', e.htmlValue);
              }} 
              style={{ height: '180px', fontSize: '16px'}} />
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
      </div>
    </div>
  );
};

export default AddScrArticle;