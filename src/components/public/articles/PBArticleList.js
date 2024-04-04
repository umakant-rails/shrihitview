import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getArticles, getArticlesByPage } from '../../../actions/public/articles';
import SearchArticleList from './SearchArticleList';
import shrihit from "../../../assets/images/shrihit.png";
import { dateFormat } from '../../../utils/utilityFunctions';
import Pagination from '../../shared/Pagination';
import { ITEM_PER_PAGE } from '../../../utils/types';

const PBArticleList = () => {
  const dispatch = useDispatch();
  const [articleList, setArticleList] = useState([]);
  const [totalArticles, setTotalArticles] = useState(null);
  const [searchApplied, setSearchApplied] = useState(false);
  const {
    articles, total_articles,
    authors, tags, contexts, article_types 
  } = useSelector( state => state.pbArticle);

  useEffect( ()=> {
    dispatch(getArticles());
  }, [dispatch]);

  useEffect( ()=> {
    if(articles){
      setArticleList(articles);
      setTotalArticles(total_articles)
    }
  }, [articles, total_articles]);
  
  const setSearchAppliedState = (stateValue) => setSearchApplied(stateValue)

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    dispatch(getArticlesByPage(page));
  };

  return (
    <div>
      <div className='grid md:grid-cols-12'>
        <div className='md:col-start-2 md:col-span-10'>
          <SearchArticleList setSearchAppliedState={setSearchAppliedState} />
        </div>
      </div>
      <div className='grid md:grid-cols-12'>
        {
          !searchApplied && (
            <div className='col-start-2 col-span-10'>
              <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
                नवीनतम रचनायें
              </div>
              <div className="grid md:grid-cols-10 gap-10">
                <div className="md:col-span-7 sm:col-span-full">
                  {
                    articleList && articleList.map((article, index) =>
                      <div key={index} className='grid md:grid-cols-12 shadow-xl sm:grid-cols-1 gap-2 pb-4 mb-4 border-b-2 border-gray-200'>
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
                  {
                    totalArticles && <Pagination 
                      showWidget={5} 
                      totalItems={totalArticles}
                      itemsPerPage={ITEM_PER_PAGE}
                      pageChangeHandler= {handlePageClick}
                    />
                  }
                </div>
                <div className="md:col-span-3 sm:col-span-full">
                  <div className='mb-5 shadow-xl'>
                    <div className='text-xl font-bold border-b-2 bg-blue-50 px-4 py-2 text-blue-800'>
                      रचना प्रकार
                    </div>
                    <fieldset className='max-h-64 overflow-y-scroll px-2'>
                      { 
                        article_types && article_types.map((article_type, index) =>
                          <Link to={`/pb/article_types/${article_type.name}`} key={index} 
                            className='flex items-center px-3 py-2 text-blue-700 border-b border-gray-300 hover:text-blue-900' >
                            {article_type.name}
                          </Link>
                        )
                      }
                    </fieldset>
                  </div>
                  <div className='mb-5 shadow-xl'>
                    <div className='text-xl font-bold border-b-2 bg-blue-50 text-blue-800 px-4 py-2'>
                      लेखक/रचनाकार {authors && authors.length}
                    </div>
                    <fieldset className='max-h-64 overflow-y-scroll pb-4'>
                      { 
                        authors && authors.map((author, index) =>
                          <Link to={`/pb/authors/${author.name}`} key={index} 
                            className='flex items-center px-3 py-2 text-blue-700 border-b border-gray-300 hover:text-blue-900 border-b' >
                            <div>{author.name}</div>
                          </Link>
                        )
                      }
                    </fieldset>
                  </div>
                  <div className='mb-5 shadow-xl'>
                    <div className='text-xl font-bold border-b-2 text-blue-800 bg-blue-50 px-4 py-2'>
                      प्रसंग
                    </div>
                    <fieldset className='max-h-64 overflow-y-scroll'>
                      { 
                        contexts && contexts.map((context, index) =>
                          <Link to={`/pb/contexts/${context.name}`} key={index} 
                            className='flex items-center px-3 py-2 text-blue-700 border-b border-gray-300 hover:text-blue-900' >
                            <div>{context.name}</div>
                          </Link>
                        )
                      }
                    </fieldset>
                  </div>
                  <div className='mb-5 shadow-xl'>
                    <div className='text-xl font-bold border-b-2 text-blue-800 bg-blue-50 px-4 py-2 mb-2'>
                      टैग्स
                    </div>
                    <fieldset className='max-h-64 overflow-y-scroll'>
                      { 
                        tags && tags.map((tag, index) =>
                          <Link to={`/pb/tags/${tag.name}`} key={index} 
                            className='flex items-center px-3 py-2 text-blue-700 border-b border-gray-300 hover:text-blue-900' >
                            <div>{tag.name}</div>
                          </Link>
                        )
                      }
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PBArticleList;