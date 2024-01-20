import React from 'react';

const RasikVani = ({scripture}) => {
  return (
    <div>
      <div className='!py-5 article-header-violet mb-3 text-3xl !text-blue-800 text-center'>
        {scripture && scripture.name} 
      </div>
      {scripture.articles && scripture.articles.map((article, index) =>
        <div key={article.id} className='grid grid-cols-12'>
          <div className='flex justify-center items-center'>
            <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
            </svg>
          </div>
          <div className='col-span-10'>
            <div className='text-3xl font-bold text-center bg-slate-800 text-white rounded-md py-3 mt-5 mb-8 shadow-xl shadow-purple-400'>
              {article.hindi_title}
            </div>
            <div className='text-2xl px-8 leading-10'>
              {<div dangerouslySetInnerHTML={{__html: article.content}} />}
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default RasikVani;