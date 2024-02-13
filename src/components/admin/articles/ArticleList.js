import React, { useEffect, useState } from 'react';
import { deleteArticle, getArticles, getArticlesByPage } from '../../../actions/admin/admin_articles';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { Link, useNavigate } from 'react-router-dom';

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    articleTypes, raags, contexts, 
    authors, tags, scriptures, articles, 
    totalArticles } = useSelector( state => state.adminArticle );

  const [articleList, setArticleList] = useState(articles);

  useEffect( () => {
    dispatch(getArticles());
  }, []);
  
  useEffect( () => {
    if(articles){ setArticleList(articles); }
    //if(articleDeleted){ navigate("/articles", {replace: true}); }
  }, [articles]);

  const deleteToArticle = (id) => {
    dispatch(deleteArticle(id));
  }
  const handlePageClick = (e) => {
    const page = e.target.textContent;
    dispatch(getArticlesByPage(page));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना सूची
        </div>
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700 bg-yellow-500">
              <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
              <th scope="col" className="px-2 py-3">रचनायें</th>
              <th scope="col" className="px-2 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {articleList && articleList.map( (article, index) => 
            <tr key={index}
            className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
              <th scope="row" 
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index+1}
              </th>
              <td className="px-2 py-3">
                <Link to={`/articles/${article.id}`}>
                  {article.hindi_title}
                </Link>
              </td>
              <td className="px-2 py-3 flex items-center justify-end">
                <Link to={`/articles/${article.id}`}>
                  <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                </Link>
                <Link to={`/articles/${article.id}/edit`}>
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
            )}
          </tbody>
        </table>
        
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          {
            totalArticles &&
            <Pagination 
              showWidget={5} 
              totalItems={totalArticles}
              itemsPerPage={10}
              pageChangeHandler= {handlePageClick}
            />
          }
        </nav>
      </div>
    </div>
  );
};

export default ArticleList;