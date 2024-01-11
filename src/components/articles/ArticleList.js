import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactTransliterate } from "react-transliterate";
import shrihit from "../../assets/images/shrihit.png"
import { dateFormat } from '../../utils/utilityFunctions';
import { getArticle, getArticles } from '../../actions/articles';
import axios from 'axios';

const ArticleList = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [searchArticles, setSearchArticles] = useState([]);
  const [autoCompleteArticles, setAutoCompleteArticles] = useState([]);
  //const [showAutoComplete, setShowAutoComplete] = useState(false);
  const {articles, authors, tags, contexts, article_types } = useSelector( state => state.article);

  useEffect( ()=> {
    dispatch(getArticles());
  }, []);

  useEffect( ()=> {
    setSearchArticles(articles);
  }, [articles]);
  
  
  const searchToArticles = async (term) => {
    console.log(term)
    const response = await axios.get(
      `http://localhost:3001/pb/articles/search_articles`, {params: {term: term}} 
    );
    return response;
    // dispatch(searchArticles(text))
    // dispatch(searchArticles(text)).then( response => {
    //   if(response.status === 200) {
    //     console.log(response);
    //   }
    // }).catch(error => {
    //   console.log("error");
    //   console.log(error);
    // });
  }

  const showAutoComplete = async (event) => {
    if(event.keyCode === 32 || event.keyCode === 13){
      const response = await searchToArticles(text);
      // const response = dispatch(searchToArticles(text));
      setAutoCompleteArticles(response.data.articles);
    }
  }
  
  const searchArticle = async (term) => {
    //const term = event.target.textContent.trim();
    setText(term);
    // const response = await axios.get(
    //   `http://localhost:3001/pb/articles/search_articles`, {params: {term: term}} 
    // );
    const response = await searchToArticles(term)
    setSearchArticles(response.data.articles);
    setAutoCompleteArticles([]);
  }
  const searchOnSubmit = async (term) => {
    const response = await searchToArticles(term)
    setSearchArticles(response.data.articles);
    setAutoCompleteArticles([]);
  }

  return (
    <div>
      <div className='grid grid-cols-5 mb-5'>
        <form className="col-start-2 col-span-3 grow" 
          onSubmit={(event) => {event.preventDefault(); searchOnSubmit(text);}}>   
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10" >
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <ReactTransliterate
              value={text}
              onChangeText={(text) => {setText(text); /*searchArticles(text);*/ }}
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
                onClick={(e) => searchArticle(e.target.textContent.trim())}
                className="flex items-center space-x-3 rtl:space-x-reverse border-b-2 border-x-2 hover:bg-gray-200 py-2 px-2">
                <span>{article.hindi_title}</span>
              </li>
            ))} 
          </ul>
        </form>
      </div>
      <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
        नवीनतम रचनायें
      </div>
      <div className="grid lg:grid-cols-10 md:grid-cols-10 gap-10">
        <div className="md:col-span-7 sm:col-span-full">
          {
            searchArticles && searchArticles.map((article, index) =>
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
                  </Link>
                  <div className='text-xl max-h-36 overflow-hidden py-2 px-2 mb-3'>
                    {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                  </div>
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
        </div>
        <div className="md:col-span-3 sm:col-span-full">
          <div className='mb-5 shadow-xl'>
            <div className='text-xl font-bold border-b-2 bg-blue-50 px-1 py-2 mb-2 text-blue-800'>
              रचना प्रकार
            </div>
            <fieldset className='max-h-64 overflow-y-scroll px-2'>
              { 
                article_types && article_types.map((article_type, index) =>
                  <Link to={`/article_types/${article_type.name}`} key={index} 
                    className='flex items-center mb-4 px-3 text-blue-700 hover:text-blue-900' >
                    <div>{article_type.name}</div>
                  </Link>
                )
              }
            </fieldset>
          </div>

          <div className='mb-5 shadow-xl'>
            <div className='text-xl font-bold border-b-2 bg-blue-50 text-blue-800 px-1 py-2 mb-2'>
              लेखक/रचनाकार
            </div>
            <fieldset className='max-h-64 overflow-y-scroll py-4'>
              { 
                authors && authors.map((author, index) =>
                  <Link to={`/authors/${author.name}`} key={index} 
                    className='flex items-center mb-4 px-3 text-blue-700 hover:text-blue-900' >
                    <div>{author.name}</div>
                  </Link>
                )
              }
            </fieldset>
          </div>
          
          <div className='mb-5 shadow-xl'>
            <div className='text-xl font-bold border-b-2 text-blue-800 bg-blue-50 px-1 py-2 mb-2'>
              प्रसंग
            </div>
            <fieldset className='max-h-64 overflow-y-scroll'>
              { 
                contexts && contexts.map((context, index) =>
                  <Link to={`/contexts/${context.name}`} key={index} 
                    className='flex items-center mb-4 px-3 text-blue-700 hover:text-blue-900' >
                    <div>{context.name}</div>
                  </Link>
                )
              }
            </fieldset>
          </div>

          <div className='mb-5 shadow-xl'>
            <div className='text-xl font-bold border-b-2 text-blue-800 bg-blue-50 px-1 py-2 mb-2'>
              टैग्स
            </div>
            <fieldset className='max-h-64 overflow-y-scroll'>
              { 
                tags && tags.map((tag, index) =>
                  <Link to={`/tags/${tag.name}`} key={index} 
                    className='flex items-center mb-4 px-3 text-blue-700 hover:text-blue-900' >
                    <div>{tag.name}</div>
                  </Link>
                  // <div key={`tags${index}`} class="flex items-center mb-4">
                  //   <input id={`tag-${index}`} type="radio" name="tag" value={tag.name} class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                  //   <label for="country-option-1" class="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                  //     {tag.name}
                  //   </label>
                  // </div>
                )
              }
            </fieldset>
          </div>

        </div>
      </div> 
    </div>
  );
};

export default ArticleList;