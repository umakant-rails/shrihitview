import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { getScrArticles } from '../../../actions/public/scriptures';

const ScriptureShow = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const [currentArticle, setCurrentArticle] = useState(1);
  const [indexing, setIndexing] = useState(false);
  const { scripture } = useSelector(state => state.scripture);
  const [titleAttr, setTitleAtrr] = useState(null);
  const [contentAttr, setContentArr] = useState(null);

  const nextCls = (scripture && currentArticle === scripture.articles.length) ? 'text-gray-400' : 'text-gray-800';;
  const prevCls = (currentArticle === 1) ? 'text-gray-400' : 'text-gray-800';

  useEffect( () => { dispatch(getScrArticles(id)); }, [id]);
  useEffect( () => { 
    if(scripture && scripture.scripture_type === "रसिक वाणी"){
      setTitleAtrr("hindi_title"); setContentArr("content");
    } else if (scripture && scripture.scripture_type === "कथायें"){
      setTitleAtrr("title"); setContentArr("story");
    }
  }, [scripture]);

  const updateIndexing = () => setIndexing(!indexing);
  const navigateArticle = (articleIndex) => {
    if(indexing){
      setIndexing(!indexing);
      window.scrollTo({top: 0, behavior: 'instant'});
    }

    if(articleIndex < 1){
      setCurrentArticle(1);
    } else if(articleIndex > scripture.articles.length) {
      setCurrentArticle(scripture.articles.length);
    } else {
      setCurrentArticle(articleIndex);
    }
  }
 
  return (
    <div className='grid md:grid-cols-12'>
      <div className='lg:col-start-2 lg:col-span-10 md:col-span-12'>
        <div className='grid md:grid-cols-12'>
          <div className='lg:col-start-2 lg:col-span-10 md:col-span-12 border-2 border-gray-2 pb-4 shadow-2xl page-min'>
            <div className='!py-5 article-header-violet mb-3 text-3xl !text-blue-800 text-center'>
              <span className='float-left ms-2'>
                <button onClick={updateIndexing}>
                  <svg className="w-[31px] h-[31px] text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                  </svg>
                </button>
              </span>
              {scripture && scripture.name}
            </div>
            <div className={`${indexing && 'hidden'}`}>
              {scripture && scripture.articles && scripture.articles.map((article, index) =>
                (currentArticle === index+1 ) && (
                  <div key={article.id} className='grid md:grid-cols-12'>
                    <div className='hidden md:flex flex justify-center items-center page-fixed' >
                      <button onClick={e => navigateArticle(currentArticle-1)}>
                        <svg className={`w-[38px] h-[38px] ${prevCls} dark:text-white`} aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                        </svg>
                      </button>
                    </div>
                    <div className='md:col-span-10'>
                      <div className='text-3xl font-bold text-center bg-slate-800 text-white rounded-md py-3 mt-5 mb-8 shadow-xl shadow-purple-400'>
                        {currentArticle}. {article[titleAttr]}
                      </div>
                      <div className='text-2xl px-8 leading-10'>
                        {<div dangerouslySetInnerHTML={{__html: article[contentAttr]}} />}
                      </div>
                    </div>
                    <div className='hidden md:flex flex justify-center items-center page-fixed'>
                      <button onClick={e => navigateArticle(currentArticle+1)}>
                        <svg className={`w-[38px] h-[38px] ${nextCls} dark:text-white`} aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={`grid md:grid-cols-12 page-scroll ${!indexing && 'hidden'}`}>
              <div className='col-start-2 col-span-10'>
                <div className='text-3xl font-bold text-center bg-slate-800 text-white rounded-md py-3 mx-3 my-8 shadow-purple-400'>
                  अनुक्रमाणिका
                </div>
                <ul className='grid grid-cols-12 mx-3'>
                  {
                    scripture && scripture.articles && scripture.articles.map((article, index) =>
                      <Link to="#" onClick={e => navigateArticle(index+1)} className={`col-span-6 text-xl text-blue-800 px-4 py-2 border-b ${index%2 === 0 && 'border-r'} ${[0,1].includes(index) && 'border-t'} border-gray-500`}>
                        <li>
                          {index+1}. {article[titleAttr]}
                        </li>
                      </Link>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptureShow;