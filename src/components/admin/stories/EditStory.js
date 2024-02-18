import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import { useNavigate, useParams } from 'react-router';
import { editStory, updateStory } from '../../../actions/admin/admin_stories';

const storyObj = {scripture_id: '', title: '', story: '', author_id: '', index: ''};

const EditStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState(storyObj);
  const { sants, scriptures, story, storyUpdated } = useSelector( (state) => state.adminStory)

  useEffect( () => {
    dispatch(editStory(id));  
  }, [id]);

  useEffect( () => {
    if(story){
      setFormValues( formValues => ({
        scripture_id: story.scripture_id,
        title: story.title, story: story.story,
        author_id: story.author_id, index: story.index
      }))
    }
    if(storyUpdated){
      navigate(`/stories/${storyUpdated.id}`); 
    } 
  }, [story, storyUpdated]);
  
  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const resetForm = () => {setFormValues(storyObj); }
  const onCancel = event => { event.preventDefault(); resetForm();}

  const onStorySubmit = (event) => {
    event.preventDefault();
    dispatch(updateStory(id, formValues));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          संत चरित्र/प्रेरक प्रसंग अद्यतन फॉर्म
        </div>
        <form id="story-new-form" className="py-5 px-10" onSubmit={onStorySubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                संत का नाम
              </label>
              <select id="author_id" name="author_id" 
                value={formValues.author_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">संत का नाम चुने</option>
                  {
                    sants && sants.map( (sant, index) => 
                      <option key={index} value={sant.id}>{sant.name}</option>
                    )
                  }
              </select>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                ग्रन्थ/बुक का नाम
              </label>
              <select id="scripture_id" name="scripture_id" 
                value={formValues.scripture_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">ग्रन्थ/बुक चुने</option>
                  {
                    scriptures && scriptures.map( (scripture, index) => 
                      <option key={index} value={scripture.id}>{scripture.name}</option>
                    )
                  }
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
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
            <div className='col-span-6'>
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                अनुक्रम
              </label>
              <input
                type="number" id="index" name="index"
                value={formValues.index || ''}
                onChange={onInputChange}
                className={`block w-full p-2.5 text-sm text-gray-900 border border-gray-300 
                  rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            </div>
          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना <span title="required" className="text-red-600 font-bold">*</span>
            </label>
            <Editor name="story" 
              value={formValues.story}
              onTextChange={ e => { 
                setEditorValues('story', e.htmlValue);} 
              }
              style={{ height: '220px', fontSize: '16px'}} />
          </div>
          <div className='mb-3'>
            <button type="submit" 
              className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              संत चरित्र/प्रेरक प्रसंग अद्यतन करे
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

export default EditStory;