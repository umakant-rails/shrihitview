import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import { MultiSelect } from "react-multi-select-component";
import {createTag, editArticle, updateArticle} from "../../../slices/user/userArticleSlice";
import { useNavigate, useParams } from 'react-router';

const articleObj = {article_type_id: 0, raag_id: 0, scripture_id: '', index: 0, context_id: 1, 
  author_id: 9, hindi_title: '', english_title: '', content: '', interpretation: '', tags: []
};

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newTag, setNewTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [formValues, setFormValues] = useState(articleObj);
  const [contentText, setContentText] = useState(null);
  const [tagFormDisplay,setTagFormDisplay] = useState(false);

  const { 
    article_types, 
    raags, 
    contexts, 
    authors, 
    tags, 
    scriptures, 
    article, 
    updated_article 
  } = useSelector( (state) => state.userArticle)

  useEffect( () => {
    dispatch(editArticle(id));
  }, [dispatch, id]);

  useEffect( () => {
    if(updated_article){
      navigate(`/articles/${updated_article.id}`);
    } 
  }, [navigate, updated_article]);

  useEffect( () => {
    if(article){
      setFormValues( formValues => ({...formValues, 
        article_type_id: article.article_type_id, 
        raag_id: article.raag_id, 
        scripture_id: article.scripture_id, 
        index: article.index, 
        context_id: article.context_id, 
        author_id: article.author_id, 
        hindi_title: article.hindi_title,
        english_title: article.english_title, 
        content: article.content, 
        interpretation: article, 
        tags: []
      }));
      setSelectedTags(article.tags.map(tag => ({'label': tag.name, 'value': tag.id})));
    }
    
  }, [article]);

  const createNewTag = () => {
    dispatch(createTag(newTag));
  }

  const setArticleTitle = () => {
    if (contentText){
      setFormValues({...formValues, hindi_title: contentText.substring(0, contentText.indexOf("\n"))});
    }
  }
  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }
  const onInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const resetForm = () => { setSelectedTags([]); setFormValues(articleObj); }
  const onCancel = event => { event.preventDefault(); resetForm() }

  const onArticleSubmit = (event) => {
    event.preventDefault(); 
    setArticleTitle();
    formValues['tags'] = selectedTags.map(tag => tag.value);
    dispatch(updateArticle({id: article.id, form: formValues}));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना अद्यतन फार्म
        </div>
        <form id="edit_article" name="article" className="py-5 px-5" onSubmit={onArticleSubmit}>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रचना का प्रकार <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <select id="article_type_id" name="article_type_id" 
                value={formValues.article_type_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required>
                  <option value="">रचना प्रकार चुने</option>
                  {
                    article_types && article_types.map( (aType, index) => 
                      <option key={index} value={aType.id}>{aType.name}</option>
                    )
                  }
              </select>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                राग 
              </label>
              <select id="raag_id" name="raag_id" 
                value={formValues.raag_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">राग चुने</option>
                  {
                    raags && raags.map( (raag, index) => 
                      <option key={index} value={raag.name}>{raag.name_eng} / {raag.name}</option>
                    )
                  }
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रसिक वाणी
              </label> 
              <select id="scripture_id" name="scripture_id" 
                value={formValues.scripture_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">रसिक वाणी चुने</option>
                  {
                    scriptures && scriptures.map( (scripture, index) => 
                      <option key={index} value={scripture.id}>{scripture.name}</option>
                    )
                  }
              </select>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                रसिक वाणी पद अनुक्रम 
              </label>
              <input type="number" id="index" name="index"
                value={formValues.index || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
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
              <select id="context_id" name="context_id" 
                value={formValues.context_id || ''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required>
                  <option value="">प्रसंग चुने</option>
                  {
                    contexts && contexts.map( (context, index) => 
                      <option key={index} value={context.id}>
                        {context.name}
                      </option>
                    )
                  }
              </select>
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                लेखक
              </label>
              <select id="author_id" name="author_id" 
                value={formValues.author_id ||''}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`} required>
                  <option value="">लेखक चुने</option>
                  {
                    authors && authors.map( (author, index) => 
                      <option key={index} value={author.id}>{author.name_eng} / {author.name}</option>
                    )
                  }
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-12 gap-6 mb-3'>
            <div className="col-span-6">
              <label className="flex flex-row justify-between mb-2 font-medium text-gray-900 dark:text-white">
                <div>
                  हिंदी शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
                </div>
                <svg className="w-6 h-6 text-blue-600 dark:text-white justify-end items-end" aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                  onClick={setArticleTitle}>
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                </svg>
              </label>
              <ReactTransliterate
                value={formValues.hindi_title || ''}
                onChangeText={(text) => { setFormValues(formValues => ({...formValues, hindi_title: text})) }}
                lang={'hi'}
                type="text"
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}
              />
            </div>
            <div className="col-span-6">
              <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                इंग्लिश शीर्षक <span title="required" className="text-red-600 font-bold">*</span>
              </label>
              <input type="text" id="english_title" name="english_title"
                value={formValues.english_title}
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
              tagFormDisplay ? (
                <>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      टैग फॉर्म
                    </label>
                  </div>
                  <div className='col-span-8 mr-5'>
                    <ReactTransliterate
                      value={newTag}
                      onChangeText={(text) => {setNewTag(text); }}
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
                      onClick={() => createNewTag(newTag)}
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 
                        py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800`}>
                      टैग बनाये
                    </button>
                  </div>
                  <div className='col-span-2'>
                    <button type="button" 
                      onClick={() => setTagFormDisplay(false)}
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 
                        py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800`}>
                      टैग सूची प्रदर्शित करे
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      टैग्स
                    </label>
                  </div>
                  <div className='col-span-10 mr-5'>
                    {tags && <MultiSelect
                      options={tags.map( (tag) => ({label: tag.name, value: tag.id}))}
                      value={selectedTags}
                      onChange={setSelectedTags}
                      labelledBy="Select"
                    />}
                  </div>
                  <div className='col-span-2'>
                    <button type="button" 
                      onClick={() => setTagFormDisplay(true)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      नया टैग टाइप करे
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
            <Editor  name="content" 
              value={formValues.content}
              onTextChange={ e => { 
                setEditorValues('content', e.htmlValue);
                setContentText(e.textValue);} 
              }
              style={{ height: '220px', fontSize: '16px'}} />

          </div>
          <div className='mb-3'>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              रचना का अर्थ
            </label>
            <Editor value={formValues.interpretation} 
              name="interpretation" 
              onTextChange={(e) => {
                setEditorValues('interpretation', e.htmlValue);
              }} 
              style={{ height: '220px', fontSize: '16px'}} />
          </div>
          <div className='mb-3'>
            <button type="submit" 
              className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

export default EditArticle;