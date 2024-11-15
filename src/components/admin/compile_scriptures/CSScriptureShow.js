import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';

import { 
  showCSScripture, 
  getCSArticles, 
  updateIndex, 
  deleteCSArticle,
  updateArticleChapter,
} from '../../../slices/admin/adminCompileScrSlice';


const CSScriptureShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const popup = useRef(null);
  const { 
    scripture, 
    chapters, 
    total_articles, 
    articles, 
    current_page 
  } = useSelector( state => state.adminCompileScr);
  const [articleList, setArticleList] = useState([]);
  const [chapterList, setChapterList] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [totalArticleQnty, setTotalArticleQnty] = useState(total_articles);
  const [currentPage, setCurrentPage] = useState(current_page || 1);
  const [params, setParams] = useState({page: 1});
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newChapterId, setNewChapterId] = useState(null);

  useEffect( () => {
    if(id){ dispatch(showCSScripture({scripture_id: id}));  }
  }, [dispatch, id]);

  useEffect( () => {
    if(articles){
      setArticleList(articles);
      setTotalArticleQnty(total_articles);
      setChapterList(chapters);
      setCurrentPage(current_page);
      
    }
  }, [articles, total_articles, chapters, current_page, params])

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    if(page.toString() !== currentPage){
      let sAttrs = {...params, page: page};
      setCurrentPage(page);
      setParams(sAttrs);
      dispatch(getCSArticles({scripture_id: scripture.id, params : sAttrs}));
    }
  };
 
  const fetchChapterArticles = (event) => {
    let chapterId = event.target.value;
    setSelectedChapterId(chapterId);
    let sAttrs = {...params, chapter_id: chapterId, page: 1};
    setParams(params => ({...params, chapter_id: chapterId}));
    dispatch(getCSArticles({scripture_id: scripture.id, params : sAttrs}));
  }
  const updateToIndex = (e, article_id) =>{
    let newIndex = e.target.previousSibling.value;
    let sAttrs = {...params, article_id: article_id, index: newIndex}
    dispatch(updateIndex({scripture_id: scripture.id, params : sAttrs}));
    e.target.previousSibling.value = '';
  }
  const removeCSArticle = (article_id) => {
    let sAttrs = {...params, article_id: article_id}
    dispatch(deleteCSArticle({scripture_id: scripture.id, params : sAttrs}));
  }

  const popupFunc = () => {  
    return (
      <div id="edit-article-index-modal" tabIndex="-1" aria-hidden="true" 
        className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-2 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-3 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                अध्याय फॉर्म
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
            {selectedArticle && 
              <form className="py-3 px-10">
                <div className="pb-4 md:pb-4 space-y-4">
                  <div className='mb-3'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      रचना <span title="required" className="text-red-600 font-bold">*</span>
                    </label>
                    <input type='text' value={selectedArticle.hindi_title} className={`bg-gray-200 border 
                      border-gray-300 text-gray-900 rounded block w-full p-2`} disabled />
                  </div>
                </div>
                <div className="pb-4 md:pb-4 space-y-4">
                  <div className='mb-3'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      वर्तमान अध्याय
                    </label>
                    <input type='text' value={selectedArticle.chapter} className={`bg-gray-200 border 
                      border-gray-300 text-gray-900 rounded block w-full p-2`} disabled />
                  </div>
                </div>
                <div className="pb-4 md:pb-4 space-y-4">
                  <div className='mb-3'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      नया अध्याय चुने <span title="required" className="text-red-600 font-bold">*</span>
                    </label>
                    <select id="chapter_id" name="chapter_id" 
                      onChange={e => setNewChapterId(e.target.value)}
                      className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                        rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                        dark:shadow-sm-light`} required>
                        <option value="">सेक्शन चुने</option>
                        {
                          chapters && chapters.map( (chapter, index) => 
                            <option key={index} value={chapter.id}>{chapter.name}</option>
                          )
                        }
                    </select>
                  </div>
                </div>
                <div className="flex items-center p-3 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button type="button"
                    onClick={updateChapterOfArticle} 
                    className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    रचना का अध्याय अद्यतित करे
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
            }
          </div>
        </div>
      </div>
    )
  }

  const updateChapterOfArticle = () => {
    if(newChapterId){
      dispatch(
        updateArticleChapter({
          id: scripture.id ,
          chapter_id: selectedChapterId,
          cs_article_id: selectedArticle.cs_article_id, 
          new_chapter_id: newChapterId,
          page: currentPage
        })
      );
      hidePopup();
    } else {
      alert('कृपया पहले नया अध्याय चुने |')
    }
  }
  const showPopup = (article) => {
    setSelectedArticle(article);
    const modalEl = document.getElementById('edit-article-index-modal');
    const privacyModal = new Modal(modalEl, { placement: 'center' });
    popup.current = privacyModal;
    privacyModal.show();
  }
  const hidePopup = () => { popup.current.hide(); popup.current = null; }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          संकलन ग्रन्थ - {scripture && scripture.name}
        </div>

        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {
              chapterList && chapterList.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2"></div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <select id="chapter_id" name="chapter_id" 
                        value={selectedChapterId}
                        onChange={fetchChapterArticles}
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
                </div>
              ) : null
            }
            <div className="overflow-x-auto min-h-72 px-4">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रचना</th>
                    <th scope="col" className="px-2 py-3">अध्याय</th>
                    <th scope="col" className="px-2 py-3">अनुक्रम</th>
                    <th scope="col" className="px-2 py-3">रचना प्रकार</th>
                    <th scope="col" className="px-2 py-3 text-center">गतिविधि</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    articleList && articleList.length > 0 ? articleList.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td className="px-2 py-3">
                          {article.hindi_title}
                        </td>
                        <td className="px-2 py-3">
                          {article.chapter}
                        </td>
                        <td className="px-2 py-3">
                          {article.index}
                        </td>
                        <td className="px-2 py-3">
                          {article.article_type}
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <div className='mr-2'>
                            <input type="number" className="w-16 mr-3 rounded px-2 py-1"/>
                            <button onClick={e => updateToIndex(e, article.id)}
                              className="bg-blue-500 text-white rounded px-3 py-1">
                              अनुक्रम बदलें
                            </button>
                          </div>
                          <Link to={'#'} onClick={e => showPopup(article)} 
                            className={`text-white bg-blue-500 rounded py-1 px-4 mr-2`}
                          >
                            Move
                          </Link>
                          <Link to="#" onClick={e => removeCSArticle(article.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className='text-center py-5'>
                          There is no articles available.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalArticleQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalArticleQnty}
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

export default CSScriptureShow;