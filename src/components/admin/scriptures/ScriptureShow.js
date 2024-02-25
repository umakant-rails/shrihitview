import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite';
import { ReactTransliterate } from "react-transliterate";
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { getScripture } from '../../../actions/admin/admin_scriptures';
import { dateFormat } from '../../../utils/utilityFunctions';

const chapterObj = {scripture_id: '', name: '', is_section: '', index: '', parent_id: ''};

const ScriptureShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const { scripture, scriptures, sections, chapters, total_chapters, current_page } = useSelector( state => state.adminScripture);
  const [chapterList, setChapterList] = useState(chapters);
  const [totalChapterQnty, setTotalChapterQnty] = useState(total_chapters);
  const [currentPage, setCurrentPage] = useState(current_page || 1);
  const [formValues, setFormValues] = useState(chapterObj);
  const [popupForm, setPopupForm] = useState(null);
  const popup = useRef(null);

  useEffect( () => {
    dispatch(getScripture(id));
  }, [id]);

  useEffect( () => {
    if(chapters){
      setChapterList(chapters);
      setTotalChapterQnty(total_chapters);
      setCurrentPage(current_page);
      setFormValues(formValues => ({...formValues, scripture_id: scripture.id}))
    }
  }, [chapters])

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    // let sAttrs = {...searchAttr, page: page};
    // setSearchAttr(sAttrs);
    //dispatch(getChapters(sAttrs));
  };

  const createToChapter = (id) => {
    //dispatch(deleteScripture(id));
  }
  const updateToChapter = (id) => {
    //dispatch(deleteScripture(id));
  }
  const deleteToChapter = (id) => {
    //dispatch(deleteScripture(id));
  }

  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const showPopup = () => {
    const modalEl = document.getElementById('new-scr-chapter-modal');
    const privacyModal = new Modal(modalEl, { placement: 'center' });
    popup.current = privacyModal;
    privacyModal.show();
  }
  const hidePopup = () => { popup.current.hide(); popup.current = null; }

  const popupFunc = () => {
    
    return (
      <div id="new-scr-chapter-modal" tabIndex="-1" aria-hidden="true" 
        className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-2 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-3 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                { popupForm === 'chapter' ? 'अध्याय फॉर्म' : 'सेक्शन फॉर्म'}
              </h3>
              <button type="button" 
                onClick={hidePopup}
                className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center 
                  dark:hover:bg-gray-600 dark:hover:text-white`}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="py-3 px-10">
              <div className="pb-4 md:pb-4 space-y-4">
                <div className='mb-3'>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    रसिक वाणी/ग्रन्थ <span title="required" className="text-red-600 font-bold">*</span>
                  </label>
                  <select id="scripture_id" name="scripture_id" 
                    value={formValues.scripture_id || ''}
                    onChange={e => setEditorValues('scripture_id', e.target.value)}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                      rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                      dark:shadow-sm-light`} required>
                      <option value="">रसिक वाणी/ग्रन्थ चुने</option>
                      {
                        scriptures && scriptures.map( (scripture, index) => 
                          <option key={index} value={scripture.id}>{scripture.name}</option>
                        )
                      }
                  </select>
                </div>
                { (popupForm === 'chapter') && (
                  <div className='mb-3'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      सेक्शन का चुने
                    </label>
                    <select id="section_id" name="section_id" 
                      value={formValues.article_type_id || ''}
                      onChange={e => setEditorValues('section_id', e.target.value)}
                      className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                        rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                        dark:shadow-sm-light`} required>
                        <option value="">सेक्शन चुने</option>
                        {
                          sections && sections.map( (section, index) => 
                            <option key={index} value={section.id}>{section.name}</option>
                          )
                        }
                    </select>
                  </div>
                  )
                }
                <div className='mb-3'>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    { popupForm === 'chapter' ? 'अध्याय का अनुक्रम' : 'सेक्शन का अनुक्रम'}&nbsp;&nbsp;  
                    <span title="required" className="text-red-600 font-bold">*</span>
                  </label>
                  <input type="number" id="name" name="name"
                    onChange={e => setEditorValues('index', e.target.value)}
                    className={`block w-full p-2.5 text-gray-900 border border-gray-300 
                    rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={formValues.index || ''} />
                </div>
                <div className='mb-3'>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    { popupForm === 'chapter' ? 'अध्याय का नाम' : 'सेक्शन का नाम'} 
                    <span title="required" className="text-red-600 font-bold">*</span>
                  </label>
                  <ReactTransliterate
                    value={formValues.name || ''}
                    onChangeText={(text) => {setEditorValues('name', text) }}
                    lang={'hi'}
                    type="text"
                    className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 
                      rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                </div>
              </div>
              <div className="flex items-center p-3 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button"
                  onClick={hidePopup} 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  { popupForm === 'chapter' ? 'अध्याय जोड़े' : 'सेक्शन जोड़े'}
                </button> 
                <button 
                  onClick={hidePopup} 
                  className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none 
                    bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                    dark:hover:bg-gray-700`}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी/ग्रन्थ - {scripture && scripture.name}
        </div>

        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button 
                    onClick={ e=>{showPopup(); setPopupForm('chapter');}}
                    data-form-type='chapter'
                    className='flex bg-blue-600 rounded p-2 text-sm text-white font-bold'>
                    अध्याय जोड़े
                  </button>
                  <button 
                    onClick={ e=>{showPopup(); setPopupForm('section');}}
                    data-form-type='section'
                    className='flex bg-blue-600 rounded p-2 text-sm text-white font-bold'>
                    सेक्शन जोड़े
                  </button>
                  <button
                    //onClick={resetFilteredAuthors}
                    className={`w-full md:w-auto flex items-center justify-center py-2 px-4 
                      text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
                      border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                      focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                      dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                      dark:hover:bg-gray-700`} type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72 px-4">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">अध्याय</th>
                    <th scope="col" className="px-2 py-3">अनुक्रम</th>
                    <th scope="col" className="px-2 py-3 text-center">गतिविधि</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    chapterList && chapterList.length > 0 ? chapterList.map( (chapter, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td className="px-2 py-3">
                          {chapter.name}
                        </td>
                        <td className="px-2 py-3">
                          {chapter.index}
                        </td>
                        <td className="px-2 py-3">
                          <button 
                            onClick={ e=>{showPopup(); setPopupForm('chapter');}}
                            data-form-type='chapter'
                            className='flex bg-blue-600 rounded p-2 text-sm text-white mb-2'>
                            अध्याय जोड़े
                          </button>
                          <button 
                            onClick={ e=>{showPopup(); setPopupForm('section');}}
                            data-form-type='section'
                            className='flex bg-blue-600 rounded p-2 text-sm text-white'>
                            सेक्शन जोड़े
                          </button>
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <Link to={`/admin/scriptures/${scripture.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteToChapter(scripture.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className='text-center py-5'>
                          There is no chapters available.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalChapterQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalChapterQnty}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              }
            </nav>
          </div>
        </section>
        {popupFunc()}
      </div>
    </div>
  );
};

export default ScriptureShow;