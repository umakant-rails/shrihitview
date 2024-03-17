import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "../assets/styles/custom.css";
import shrijicharan from "../assets/images/shriji_charan.png";
import shrihit from "../assets/images/shrihit.png";
import { dateFormat } from '../utils/utilityFunctions';
import { getHomePageData } from '../actions/home';
import SearchArticleList from '../components/public/articles/SearchArticleList';
import { ArticleSkelton } from '../components/sketons/articleSkelton';

const Home = () => {
  const dispatch = useDispatch();
  const [searchApplied, setSearchApplied] = useState(false);
  const {articles, authors, tags, contexts, article_types } = useSelector( state => state.home);

  useEffect( ()=> {
    dispatch(getHomePageData());
  }, []);
  
  const getSlideSwipterContent = () => {
    return (
      articles && articles.map((article, index) => 
        <SwiperSlide key={index}>
          <div key={index} className='shadow-xl py-2 border-b mb-3 bg-white'>
            <Link to={`/pb/articles/${article.hindi_title}`} key={`swiper-article-${index}`}>
              <img src={shrijicharan} alt="img" />
              <div className="article-header-yellow mb-3 text-xl">
                {article.hindi_title}
              </div>
              <div className='max-h-24 min-h-24 overflow-hidden mb-3 px-1'>
                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
              </div>
            </Link>
            <div className='border-y mb-3 mt-3 mx-1 py-2 px-1 border-zinc-500 overflow-y-auto text-sm font-semibold'>
              सृजन तिथि : <Link to="#" className='text-blue-500 font-medium'>
                {dateFormat(article.created_at)}
              </Link>, 
              रचना प्रकार - <Link to={`/pb/article_types/${article.article_type}`} className='text-blue-500 font-medium'>
                {article.article_type}
              </Link>, 
              रचनाकार - <Link to={`/pb/authors/${article.author}`} className='text-blue-500 font-medium'>
                {article.author}
                </Link>
            </div>
            <div className='py-2 mb-3'>
              <Link to={`/pb/articles/${article.hindi_title}`} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">रचना देखें</Link>
            </div>
          </div>    
        </SwiperSlide>
      )
    )
  }
  
  const setSearchAppliedState = (stateValue) => setSearchApplied(stateValue)

  return (
    <div>
      <div className='grid md:grid-cols-12'>
        <div className='md:col-start-2 md:col-span-10'>
          <SearchArticleList setSearchAppliedState={setSearchAppliedState} />
        </div>
      </div>
      { !searchApplied && (
          <>
            <div className="article-header-yellow mb-3 text-xl">
              नवीनतम रचनायें
            </div>
            <div className='mb-8'>
              {
                articles ? (<Swiper slidesPerView={3} spaceBetween={30}>
                  { getSlideSwipterContent() }
                </Swiper> ) : ( <ArticleSkelton />)
              }
            </div>
            <div className="grid lg:grid-cols-10 md:grid-cols-10 gap-2">
              <div className="lg:col-span-7 md:col-span-7 sm:col-span-full">
                <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border rounded-md border-blue-700 shadow-xl mb-5 font-bold'>
                  नवीनतम रचनायें
                </div>
                {
                  articles ? ( articles.map((article, index) =>
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
                  ) ): (<ArticleSkelton />)
                }
              </div>
              <div className="lg:col-span-3 md:col-span-3 hidden lg:block md:block"> 
                <div className='mb-5 shadow-xl'>
                  <div className='article-header-violet'>
                    लेखक/रचनाकार
                  </div>
                  {
                    authors ? (
                      <ul className='list-none'>
                        { 
                          authors.slice(0,5).map((author, index) =>
                            <Link key={index} to={`/pb/authors/${author.name}`}>
                              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                                {author.name}
                              </li>
                            </Link>
                          )
                        }
                        <Link to="/pb/authors">
                          <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                            View more ...
                          </li>
                        </Link>
                      </ul> 
                    ) : ( <ArticleSkelton />)
                  }
                </div>
                <div className='mb-5 shadow-xl'>
                  <div className='article-header-violet'>
                    प्रसंग
                  </div>
                  {
                    contexts ? (
                      <ul className='list-none'>
                        { 
                          contexts && contexts.slice(0,5).map((context, index) =>
                            <Link key={index} to={`/pb/contexts/${context.name}`} >
                              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                                {context.name}
                              </li>
                            </Link>
                          )
                        }
                        <Link to="/pb/contexts">
                          <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                            View more ...
                          </li>
                        </Link>
                      </ul> 
                    ) : ( <ArticleSkelton />)
                  }
                </div>
                <div className='mb-5 shadow-xl'>
                  <div className='article-header-violet'>
                    रचना प्रकार
                  </div>
                  {
                    article_types ? (
                      <ul className='list-none'>
                        { 
                          article_types && article_types.slice(0,5).map((article_type, index) =>
                            <Link key={index} to={`/pb/article_types/${article_type.name}`} >
                              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                                {article_type.name}
                              </li>
                            </Link>
                          )
                        }
                        <Link to="/pb/article_types">
                          <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                            View more ...
                          </li>
                        </Link>
                      </ul>
                    ) : ( <ArticleSkelton />)
                  }
                </div>
                <div className='mb-5 shadow-xl'>
                  <div className='article-header-violet'>
                    टैग्स
                  </div>
                  { tags ? (
                      <ul className='list-none'>
                        { 
                          tags && tags.slice(0,5).map((tag, index) =>
                            <Link key={index} to={`/pb/tags/${tag.name}`} >
                              <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                                {tag.name}
                              </li>
                            </Link>
                          )
                        }
                        <Link to="/pb/tags">
                          <li className='py-3 px-2 border-b border-gray-300 text-lg text-blue-500'>
                            View more ...
                          </li>
                        </Link>
                      </ul>
                    ) : ( <ArticleSkelton />)
                  }
                </div>
              </div>
            </div>
          </> 
        )
      }
    </div>
  );
};

export default Home;