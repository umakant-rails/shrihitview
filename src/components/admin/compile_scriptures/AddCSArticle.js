import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { useParams } from 'react-router-dom';
import { ReactTransliterate } from "react-transliterate";
import { 
  getAddArticlePageData, 
  getFilteredAritcles,
  addArticleInCS,
  removeArticleFromCS
} from '../../../slices/admin/adminCompileScrSlice';

const AddCSArticle = () => {
  const aphabetList = "अ इ उ ऋ ए क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(' ');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { 
    scripture, 
    chapters,
    articles, 
    total_articles, 
    added_articles 
  } = useSelector( state => state.adminCompileScr );

  const [articleList, setArticleList] = useState(articles);
  const [totalArticle, setTotalArticle] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [params, setParams] = useState({});
  const [chapterExist, setChapterExist] = useState(false);
  
  useEffect( () => {
    dispatch(getAddArticlePageData(id));
  }, [dispatch, id]);
  
  useEffect( () => {
    if(articles){ 
      setArticleList(articles); 
      setTotalArticle( total_articles);
      setChapterExist(chapters && chapters.length > 0 ? true : false)
    }
  }, [articles, total_articles, chapters]);

  const handlePageClick = (e) => {
    const page = e.target.getAttribute('value');
    setCurrentPage(page);
    const sAttrs = {...params, page: page};
    setParams(sAttrs);
    dispatch(getFilteredAritcles({scripture_id: scripture.id, params: sAttrs}));
  }

  const getArticlesByChapter = (e) => {
    const sAttrs = {...params, chapter_id: e.target.value };
    setParams(sAttrs);
    dispatch(getFilteredAritcles({scripture_id: scripture.id, params: sAttrs}));
  }

  const searchArticles = () => {
    const sAttrs = {...params, term: searchText.trim(), page: 1};
    setParams(sAttrs);setCurrentPage(1);
    dispatch(getFilteredAritcles({scripture_id: scripture.id, params: sAttrs}));
  }
  const searchArticlesWithStartWith = (event) => {
    const sAttrs = {...params, starts_with: event.target.value, page: 1};
    setParams(sAttrs);setCurrentPage(1);
    dispatch(getFilteredAritcles({scripture_id: scripture.id, params: sAttrs}));
  }
  const refreshFilteredData = () => {
    if(Object.keys(params).length > 0){
      const sAttrs = {chapter_id: params.chapter_id, page: 1};
      setParams(sAttrs);setSearchText('');setCurrentPage(1);
      dispatch(getFilteredAritcles({scripture_id: scripture.id, params: sAttrs}));
    }
  }
  const addArticleIntoCS = (article_id) => {
    if(chapterExist && (params.chapter_id === undefined || params.chapter_id.length === 0) ){
      alert( `कृपया पहले "${scripture.name}" के अध्याय को सेलेक्ट करे।`);
    } else {
      dispatch(addArticleInCS({scripture_id: scripture.id, article_id: article_id, params: params}));
    }
  }
  const removeCSArticle = (article_id) => {
    dispatch(removeArticleFromCS({scripture_id: scripture.id, article_id: article_id, params: params}));
  }
  
  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          नवीन संकलन ({scripture && scripture.name }) में रचनायें जोड़े
        </div>
       
        { chapters && chapters.length > 0 && (
          <div className="grid md:grid-cols-12 mb-4 gap-6">
            <div className='col-start-7 col-span-2 pt-2 font-bold text-right'>
              <span className='text-red-900'>अध्याय की सूची </span> 
            </div>
            <div className='col-span-4'>
              <select id="chapter_id" name="chapter_id" 
                value={params.chapter_id ? params.chapter_id : ''}
                onChange={getArticlesByChapter}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                  dark:shadow-sm-light`}>
                  <option value="">अध्याय चुने</option>
                  {
                    chapters && chapters.map( (chapter, index) => 
                      <option key={index} value={chapter.id}>{chapter.name}</option>
                    )
                  }
              </select>
            </div>
          </div>) 
        }
        
        <div className='grid md:grid-cols-12 gap-2 mb-4'>
          <div className='col-span-8'>
            <ReactTransliterate
              value={searchText}
              onChangeText={(text) => {setSearchText(text);}}
              lang={'hi'}
              type="text"
              className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 
                rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
          <div className='col-span-4'>
            <div className='flex'>
              <div className='w-full md:w-1/3'>
                <button
                  onClick={searchArticles}
                  className={`w-full md:w-auto flex items-center justify-center pt-2 pb-3 px-4 text-sm 
                    font-medium text-white focus:outline-none bg-blue-600 rounded hover:bg-blue-700`} type="button">
                  <svg className="w-[18px] h-[18px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                  </svg>&nbsp;&nbsp;Search
                </button>
              </div>
              <div className='w-full md:w-1/3'>
                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" 
                  className={`w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium 
                    text-gray-900 focus:outline-none bg-white rounded border border-gray-400 hover:bg-gray-100 
                    hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                    dark:hover:bg-gray-700`} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                <div id="filterDropdown" className="z-10 hidden w-96 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h6 className="mb-3 text-center text-sm font-medium text-gray-900 dark:text-white pb-2 border-b border-b-2">
                    Choose alphabet
                  </h6>
                  <div className="space-y-2 grid grid-cols-6 text-sm" aria-labelledby="filterDropdownButton">
                    {
                      aphabetList.map((alphabet, index)=>
                        <div key={index} className="">
                          <input id="alphabet" type="radio" name="alphabet" value={alphabet} 
                            checked={params.starts_with === alphabet}
                            onChange={searchArticlesWithStartWith}
                            className="w-4 h-4 me-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            {alphabet}
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/3'>
                <button
                  onClick={refreshFilteredData}
                  className={`w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium 
                    text-gray-900 focus:outline-none bg-white rounded border border-gray-400 hover:bg-gray-100 
                    hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                    dark:hover:bg-gray-700`} type="button">
                  Refresh&nbsp;&nbsp;
                  <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className="">
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700 bg-yellow-900">
                  <th scope="col" className="text-left px-2 py-3" colSpan="2">
                    Search Articles
                  </th>
                </tr>
              </thead>
              <tbody>
                {articleList && articleList.length > 0 ? (
                    articleList.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700 text-black" >
                        <td className="text-left px-2 py-3">
                          { ((currentPage-1) * 10) + index+1}. &nbsp; &nbsp;
                          {article.hindi_title} &nbsp; &nbsp;
                          <span className='font-bold text-red-600'>
                            ( {article.article_type} )
                          </span>
                        </td>
                        <td className="text-right px-2 py-2">
                          <button onClick={e => addArticleIntoCS(article.id)}
                            className='bg-blue-600 inline-flex px-2 py-1 cursor-pointer'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ) 
                  ) : (
                    <tr className="mt-4">
                      <td colSpan="5" className='text-center'>There is no data available now.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          
            <nav className="flex flex-col md:flex-row justify-between text-sm items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                (totalArticle > 0) &&
                <Pagination 
                  showWidget={3} 
                  totalItems={totalArticle}
                  itemsPerPage={10}
                  pageChangeHandler= {handlePageClick}
                />
              }
            </nav>
          </div>
          <div className="">
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700 bg-yellow-900">
                  <th scope="col" className="text-left px-2 py-3" colSpan="2">
                    <span className='text-green-400'>{scripture && scripture.name }</span> की रचनायें 
                  </th>
                  {/* <th scope="col" className="text-right px-2 py-3">गतिविधि</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  added_articles && added_articles.length > 0 ? (
                    added_articles.map( (article, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700 text-black" >
                        <td className="text-left px-2 py-3">
                          { ((currentPage-1) * 10) + index+1}. &nbsp; &nbsp;
                          {article.hindi_title} &nbsp; &nbsp;
                          <span className='font-bold text-red-600'>
                            ( {article.article_type} )
                          </span>
                        </td>
                        <td className="text-right px-2 py-2">
                          <button 
                            onClick={e => removeCSArticle(article.id)}
                            className='bg-red-600 inline-flex px-2 py-1 cursor-pointer'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ) 
                  ) : (
                    <tr className="mt-4">
                      <td colSpan="5" className='text-center'>There is no data available now.</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCSArticle;