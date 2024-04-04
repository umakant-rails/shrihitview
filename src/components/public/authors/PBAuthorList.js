import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthors } from '../../../actions/public/authors';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';

const AuthorList = () => {
  const dispatch = useDispatch();
  const aphabetList = "अ इ उ ऋ ए क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(' ');
  const [authorId, setAuthorId] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const [totalAuthors, setTotalAuthors] = useState(null)
  const [searchAttrs, setSearchAttrs] = useState({page: 1});
  const { authors, total_authors } = useSelector( state => state.author );
  
  useEffect( () => {
    dispatch(getAuthors(searchAttrs));
  }, [dispatch, searchAttrs]);

  useEffect( () => {
    if(authors){
      setAuthorList(authors);
      setTotalAuthors(total_authors);
    }
  }, [authors, total_authors]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    const sAttrs = {...searchAttrs, page: page};
    setSearchAttrs(sAttrs);
    dispatch(getAuthors(sAttrs));
  };

  const showArticles = (author) => {
    if (authorId !== author.id) {
      setAuthorId(author.id);
    } else {
      setAuthorId(null);
    }
  };

  const resetFilteredAuthors = (e) => {
    dispatch(getAuthors({page: 1}));
    document.getElementsByName("alphabet").forEach((el) => el.checked = false );
  }
  const filterAuthors = (e) => {
    const selectedAlbhabet = e.target.value;
    const sAttrs = {start_with: selectedAlbhabet, page: 1};
    setSearchAttrs(sAttrs);
    dispatch(getAuthors(sAttrs));
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचनाकार/लेखक सूची 
        </div>
        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={resetFilteredAuthors}
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
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
                        aphabetList.map((albhabet, index)=>
                          <div key={index} className="">
                            <input id="albhabet" type="radio" name="alphabet" value={albhabet} 
                              onChange={filterAuthors}
                              className="w-4 h-4 me-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              {albhabet}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                    <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
                    <th scope="col" className="px-2 py-3">रचनायें</th>
                    <th scope="col" className="px-2 py-3">Action</th>
                  </tr>
                </thead>
                {
                  authorList ? authorList.map( (author, index) => 
                    <tbody key={index} className='text-xl'>
                      <tr  
                        className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                        <th scope="row" 
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/pb/authors/${author.name}`}>{author.name}</Link>
                        </th>
                        <td className="px-2 py-3">
                          <div onClick={() => showArticles(author)}>
                            उपलब्ध रचनाये - <span className='font-bold'>
                              {author.articles ? author.articles.length : 0}
                            </span>
                          </div>                        
                        </td>
                        <td className="px-2 py-3 flex items-center justify-end">
                          <button className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                            {
                              authorId === author.id ? (
                                <div onClick={() => showArticles(author)} >
                                  <svg 
                                    className="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 4 4 4-4"/>
                                  </svg>
                                </div>
                              ) : (
                                <div onClick={() => showArticles(author)} >
                                  <svg className="w-[16px] h-[16px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
                                  </svg> 
                                </div>
                              )
                            }
                          </button>
                        </td>
                      </tr>
                      {authorId === author.id ? (
                        <tr key={`detail-${index}`}>
                          <td colSpan={3} 
                            className="p-5 border-b border-gray-200 dark:border-gray-700">
                              <div className='max-h-96 overflow-y-scroll'>
                                {author.articles && author.articles.map((article, index)=>
                                  <p key={index} >
                                    <Link to={`/pb/articles/${article.hindi_title}`} className='cursor-pointer' >
                                      {index+1}. <span className='text-blue-500'>
                                        {article.hindi_title}
                                      </span>
                                    </Link> 
                                  </p>
                                )}
                              </div>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colspan="3" className='text-center py-5'>
                          There is no Author availables.
                        </td>
                      </tr>
                    </tbody>
                  )
                }
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalAuthors &&
                <Pagination 
                  showWidget={5} 
                  totalItems={totalAuthors}
                  itemsPerPage={ITEM_PER_PAGE}
                  pageChangeHandler= {handlePageClick}
                />
              }
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthorList;