import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { Link } from 'react-router-dom';
import { confirmBeforeDeletion } from '../../../utils/utilityFunctions';
import { 
  approveArticle, 
  deleteAdminArticle, 
  getAdminArticles, 
  getArticlesByPage 
} from '../../../slices/admin/adminArticleSlice';

const AdminArticleList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const { 
    article_types, 
    contexts, 
    authors, 
    scriptures, 
    articles, 
    total_articles, 
    current_page 
  } = useSelector( state => state.adminArticle );
  const [articleList, setArticleList] = useState(articles);
  const [totalArticle, setTotalArticle] = useState(0);
  const [searchAttrs, setSearchAttrs] = useState({});
  
  useEffect( () => {
    dispatch(getAdminArticles());
  }, [dispatch]);
  
  useEffect( () => {
    if(articles){ 
      setArticleList(articles); 
      setTotalArticle(total_articles);
    }
    if(current_page){setCurrentPage(current_page);}
  }, [articles, total_articles, current_page]);

  const approveToArticle = (id) => {
    dispatch(approveArticle({id: id, params: searchAttrs}));
  }
  const deleteToArticle = (id) => {
    if(confirmBeforeDeletion()){
      dispatch(deleteAdminArticle(id));
    }
  }

  const handlePageClick = (e) => {
    const page = e.target.getAttribute('value');
    const sAttrs = {...searchAttrs, page: page};
    setSearchAttrs(sAttrs);
    dispatch(getArticlesByPage(sAttrs));
  }

  const onSearchInputChange = (event) => {
    const { name, value } = event.target;
    const sAttrs = {...searchAttrs, [name]: value, page: 1};

    setSearchAttrs(sAttrs);
    dispatch(getArticlesByPage(sAttrs, 0));
  }
  const refreshFilteredData = () => {
    setSearchAttrs({});
    const sAttrs = {page: 1};
    setSearchAttrs(sAttrs);
    dispatch(getArticlesByPage(sAttrs));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना सूची
        </div>
        <div className="grid md:grid-cols-6 mb-4 gap-2">
          <div>
            <select id="article_type_id" name="article_type_id" 
              value={searchAttrs.article_type_id ? searchAttrs.article_type_id : ''}
              onChange={onSearchInputChange}
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
          <div>
            <select id="author_id" name="author_id" 
              value={searchAttrs.author_id ? searchAttrs.author_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">लेखक चुने</option>
                {
                  authors && authors.map( (author, index) => 
                    <option key={index} value={author.id}>{author.name}</option>
                  )
                }
            </select>
          </div>
          <div>
            <select id="context_id" name="context_id" 
              value={searchAttrs.context_id ? searchAttrs.context_id : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">प्रसंग चुने</option>
                {
                  contexts && contexts.map( (context, index) => 
                    <option key={index} value={context.id}>{context.name}</option>
                  )
                }
            </select>
          </div>
          <div>
            <select id="scripture_id" name="scripture_id" 
              value={searchAttrs.scripture_id ? searchAttrs.scripture_id : ''}
              onChange={onSearchInputChange}
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
          <div>
            <select id="status" name="status" 
              value={searchAttrs.status ? searchAttrs.status : ''}
              onChange={onSearchInputChange}
              className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                dark:shadow-sm-light`}>
                <option value="">All Articles</option>
                <option value="approved">स्वीकृत</option>
                <option value="pending">लंबित</option>
            </select>
          </div>
          <div className='flex items-center justify-center'>
            <button
              onClick={refreshFilteredData}
              className={`w-full md:w-auto flex items-center justify-center pt-2 pb-3 px-4 text-sm 
                font-medium text-white focus:outline-none bg-blue-600 rounded hover:bg-blue-700`} type="button">
              Refresh&nbsp;&nbsp;
              <svg className="w-[15px] h-[15px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
              </svg>
            </button>
          </div>
        </div>
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700 bg-yellow-500">
              <th scope="col" className="px-2 py-3">क्रमांक</th>
              <th scope="col" className="px-2 py-3">रचनायें</th>
              <th scope="col" className="px-2 py-3">रचना प्रकार</th>
              <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
              <th scope="col" className="px-2 py-3">Status</th>
              <th scope="col" className="px-2 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {articleList && articleList.length > 0 ? (
                articleList.map( (article, index) => 
                  <tr key={index}
                    className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                    <th scope="row" 
                      className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        { ((currentPage-1) * 10) + index+1}
                    </th>
                    <td className="px-2 py-3">
                      <Link to={`/articles/${article.id}`}>
                        {article.hindi_title}
                      </Link>
                    </td>
                    <td className="px-2 py-3">
                      {article.article_type}
                    </td>
                    <td className="px-2 py-3">
                      {article.author}
                    </td>
                    <td className="px-2 py-3">
                      { article.is_approved  === true ? 
                        (<span className='text-green-500'>स्वीकृत</span>) 
                        : (<span className='text-red-500'>लंबित</span>)
                      }
                    </td>
                    <td className="px-2 py-3 flex items-center justify-center">
                      { article.is_approved  !== true && (
                        <button onClick={e => approveToArticle(article.id)} className='mr-2'>
                          <svg className="w-[25px] h-[25px] text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                          </svg>
                        </button>)
                      }

                      <Link to={`/articles/${article.id}`} target='_blank' >
                        <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                          <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                      </Link>
                      <Link to={`/articles/${article.id}/edit`} target='_blank' >
                        <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                        </svg>
                      </Link>
                      <Link to="#" onClick={e => deleteToArticle(article.id)} >
                        <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                      </Link>
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
        
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          {
            (totalArticle > 0) &&
            <Pagination 
              showWidget={5} 
              totalItems={totalArticle}
              itemsPerPage={10}
              pageChangeHandler= {handlePageClick}
            />
          }
        </nav>
      </div>
    </div>
  );
};

export default AdminArticleList;