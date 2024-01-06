import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticles } from '../actions/articles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import "../assets/styles/custom.css";
import shrijicharan from "../assets/images/shriji_charan.png";
import shrihit from "../assets/images/shrihit.png";
import { dateFormat } from '../utils/utilityFunctions';

const Home = () => {
  const dispatch = useDispatch();
  const {articles, authors, tags, contexts, article_types } = useSelector( state => state.article);

  useEffect( ()=> {
    dispatch(getArticles());
  }, []);
  
  const getSlideSwipterContent = () => {
    return (
      articles && articles.map((article, index) => 
        <SwiperSlide key={index}>
          <div key={index} className='shadow-xl py-2 border-b mb-3 bg-white'>
            <img src={shrijicharan} alt="img" />
            <div className="article-header-yellow mb-3 text-xl">
              {article.hindi_title}
            </div>
            <div className='max-h-24 min-h-24 overflow-hidden mb-3 px-1'>
              {<div dangerouslySetInnerHTML={{__html: article.content}} />}
            </div>
            <div className='border-y mb-3 mt-3 mx-1 py-2 px-1 border-zinc-500 overflow-y-auto text-sm font-semibold'>
              सृजन तिथि : <Link to="#" className='text-blue-500 font-medium'>{dateFormat(article.created_at)}</Link>, 
              रचना प्रकार - <Link to="#" className='text-blue-500 font-medium'>{article.article_type}</Link>, 
              रचनाकार - <Link to="#" className='text-blue-500 font-medium'>{article.author}</Link>
            </div>
            <div className='py-2 mb-3'>
              <Link to="#" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">रचना देखें</Link>
            </div>
          </div>
        </SwiperSlide>
      )
    )
  }

  return (
    <div>
      <div className='grid grid-cols-5 mb-5'>
        <form className="col-start-2 col-span-3">
          <div className="flex">
            <button id="dropdown-button" data-dropdown-toggle="dropdown11" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
              All categories 
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <div id="dropdown11" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    हिन्दी
                  </button>
                </li>
                <li>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    अंग्रेजी
                  </button>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required/>
              <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="article-header-yellow mb-3 text-xl">
        नवीनतम रचनायें
      </div>
      <div className='mb-8'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          { getSlideSwipterContent() }
        </Swiper>
      </div>
      <div className="grid lg:grid-cols-10 md:grid-cols-10 gap-2">
        <div className="lg:col-span-7 md:col-span-7 sm:col-span-full">
          <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border rounded-md border-blue-700 shadow-xl mb-5 font-bold'>
            नवीनतम रचनायें
          </div>
          {
            articles && articles.map((article, index) =>
              <div key={index} className='grid lg:grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-2 pb-4 mb-4 border-b-2 border-gray-200'>
                <div className='lg:col-span-4 md:col-span-full'>
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </div>
                <div className='lg:col-span-8 md:col-span-full'>
                  <div className='text-2xl px-2 text-amber-600 font-bold'>
                    {article.hindi_title}
                  </div>
                  <div className='text-xl max-h-36 overflow-hidden py-2 px-2 mb-3'>
                    {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                  </div>
                  <div>
                    <span className='bg-orange-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>{article.article_type}</span>
                    <span className='bg-green-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>{article.author}</span>
                    <span className='bg-blue-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>{dateFormat(article.created_at)}</span>
                  </div>
                </div>
              </div>
            )
          }
          <Link to="#">
            <div className='text-blue-500 text-center text-lg border-2 border-blue-500 rounded-md py-2 hover:bg-blue-500 hover:text-white'>View more articles ...</div>
          </Link>
        </div>
        <div className="lg:col-span-3 md:col-span-3 hidden lg:block md:block"> 
          <div className='article-header-violet'>
            लेखक/रचनाकार
          </div>
          <ul className='list-none'>
            { 
              authors && authors.slice(0,5).map((author, index) =>
                <Link key={index} to="#" >
                  <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                    {author.name}
                  </li>
                </Link>
              )
            }
            <Link to="#">
              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                View more ...
              </li>
            </Link>
          </ul>

          <div className='article-header-violet'>
            प्रसंग
          </div>
          <ul className='list-none'>
            { 
              contexts && contexts.slice(0,5).map((author, index) =>
                <Link key={index} to="#" >
                  <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                    {author.name}
                  </li>
                </Link>
              )
            }
            <Link to="#">
              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                View more ...
              </li>
            </Link>
          </ul>
          
          <div className='article-header-violet'>
            रचना प्रकार
          </div>
          <ul className='list-none'>
            { 
              article_types && article_types.slice(0,5).map((author, index) =>
                <Link key={index} to="#" >
                  <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                    {author.name}
                  </li>
                </Link>
              )
            }
            <Link to="#">
              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                View more ...
              </li>
            </Link>
          </ul>
          
          <div className='article-header-violet'>
            टैग्स
          </div>
          <ul className='list-none'>
            { 
              tags && tags.slice(0,5).map((author, index) =>
                <Link key={index} to="#" >
                  <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                    {author.name}
                  </li>
                </Link>
              )
            }
            <Link to="#">
              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                View more ...
              </li>
            </Link>
          </ul>

        </div>
      </div>
    </div>
  );

};

export default Home;