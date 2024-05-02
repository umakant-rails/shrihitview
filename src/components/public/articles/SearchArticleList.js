import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactTransliterate } from "react-transliterate";
import shrihit from "../../../assets/images/shrihit.png";
import { dateFormat } from '../../../utils/utilityFunctions';
import Pagination from '../../shared/Pagination';
import { ITEM_PER_PAGE } from '../../../utils/types';
import { searchToArticles } from '../../../actions/public/articles';


const SearchArticleList = ({setSearchAppliedState}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [searchArticles, setSearchArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [autoCompleteArticles, setAutoCompleteArticles] = useState([]);

  const showAutoComplete = async (event) => {
    if(event.target.value.length > 0  && (event.keyCode === 32 || event.keyCode === 13)){
      const response = await dispatch(searchToArticles(text, null));
      setAutoCompleteArticles(response.data.articles);
    } else if (event.target.value.length === 0) {
      setSearchAppliedState(false);
      setSearchArticles([]);
      setAutoCompleteArticles([]);
    }
  }
  const searchArticle = async (term) => {
    const response = await dispatch(searchToArticles(term, null));
    setSearchArticles(response.data.articles);
    setTotalArticles(response.data.articles.length);
    setSearchAppliedState(true);
    setAutoCompleteArticles([]);
  }
  const searchOnSubmit = async () => {
    const response = await dispatch(searchToArticles(text, 1));

    setSearchArticles(response.data.articles);
    setTotalArticles(response.data.total_articles)
    setSearchAppliedState(true);
    setAutoCompleteArticles([]);
  }
  /* end - search article functionlality */

  const handlePageClick = async(event) => {
    const page = parseInt(event.target.getAttribute('value'));
    const response = await dispatch(searchToArticles(text, page));
    setSearchArticles(response.data.articles);
  };

  return (
    <div>
      <div className='grid grid-cols-5 mb-5'>
        <form className="col-start-2 col-span-3 grow" 
          onSubmit={(event) => {event.preventDefault(); searchOnSubmit();}}>   
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10" >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <ReactTransliterate
              value={text}
              onChangeText={(text) => {setText(text); /*setSearchAppliedState(text.length === 0);*/ }}
              onKeyUp={showAutoComplete}
              lang={'hi'}
              type="search"
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <button type="submit" 
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
          <ul className="text-left text-gray-500 dark:text-gray-400">
            { autoCompleteArticles && autoCompleteArticles.map((article, index) =>(
              <li key={index} 
                onClick={(e) => { searchArticle(e.target.textContent.trim()) }}
                className="flex items-center space-x-3 rtl:space-x-reverse border-b-2 border-x-2 hover:bg-gray-200 py-2 px-2">
                <span>{article.hindi_title}</span>
              </li>
            ))} 
          </ul>
        </form>
      </div>
      {
        (totalArticles > 0 && searchArticles.length > 0) && (
          <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-blue-700 shadow-xl mb-5 font-bold'>
            Seach Articles ({totalArticles})
          </div>
        )
      }
      {
        searchArticles.length > 0 && searchArticles.map((article, index) =>
          <div key={index} className='grid lg:grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-2 pb-4 mb-4 border-b-2 border-gray-200'>
            <div className='lg:col-span-4 md:col-span-full'>
              <Link to={`/pb/articles/${article.hindi_title}`} >
                <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
              </Link>
            </div>
            <div className='lg:col-span-8 md:col-span-full'>
              <Link to={`/pb/articles/${article.hindi_title}`} key={index}>
                <div className='text-2xl px-2 text-amber-600 font-bold'>
                  {article.hindi_title}
                </div>
                <div className='text-xl max-h-36 overflow-hidden py-2 px-2 mb-3'>
                  {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                </div>
              </Link>
              <div>
                <Link to={`/pb/article_types/${article.article_type}`} >
                  <span className='bg-orange-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                    {article.article_type}
                  </span>
                </Link>
                <Link to={`/pb/authors/${article.author}`}>
                  <span className='bg-green-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                    {article.author}
                  </span>
                </Link>
                <span className='bg-blue-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                  {dateFormat(article.created_at)}
                </span>
              </div>
            </div>
          </div>
        )
      }
      {
        searchArticles && <Pagination 
          showWidget={5} 
          totalItems={totalArticles}
          itemsPerPage={ITEM_PER_PAGE}
          pageChangeHandler= {handlePageClick}
        />
      }
    </div>
  );
};

export default SearchArticleList;