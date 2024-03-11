import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getArticle } from '../../../actions/user/user_articles';
import { dateFormat } from '../../../utils/utilityFunctions';
import { Link } from 'react-router-dom';

const ArticleShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { article } = useSelector( state => state.userArticle);

  useEffect( () => {
    dispatch(getArticle(id));
  }, [id]);

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना - {article && article.hindi_title}
          {
            article && 
            <p className='text-base text-fuchsia-700'>
              ( 
                रचना प्रकार - <span className='text-blue-600'>{article.article_type}</span> ,&nbsp; 
                रचनाकार - <span className='text-blue-600'>{article.author}</span> ,&nbsp;
                सृजन तिथि - <span className='text-blue-600'>{dateFormat(article.created_at)}</span>&nbsp; 
              )
            </p>
          }
        </div>
        <div className="text-xl pb-4 mb-2">
          {article && <div dangerouslySetInnerHTML={{__html: article.content}} />}
        </div>
        {
          article && article.tags.length > 0 && <div className='font-bold align-middle'>
            <span className='mr-2'> सम्बंधित बिषय :- </span>{ article.tags.map( (tag, index) => 
                <Link to="#"  key={index} className='inline-flex mr-2 text-white bg-violet-600 px-3 py-2 rounded'>
                  <svg className="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
                  </svg>
                  <span className='ms-2'>{tag.name}</span>
                </Link>
              )
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ArticleShow;