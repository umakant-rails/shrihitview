import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getArticle } from '../../../actions/user/user_articles';
import { ReactTransliterate } from "react-transliterate";
import { dateFormat } from '../../../utils/utilityFunctions';
import { Link } from 'react-router-dom';

const ArticleShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { article } = useSelector( state => state.userArticle);

  useEffect( () => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  const resetComment = () => { 
    setComment("");
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        { article ?
          ( <> 
              <div className={`bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-50 
                border-y border-x-4 border-zinc-800 px-3 py-2`}>
                <p className='text-2xl font-bold text-cyan-800 mb-1 px-2'>{article.hindi_title}</p>
                <p className='px-2'>
                  ( <span className='font-bold text-red-500 text-medium'>रचनाकार - </span>{article.author},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>सृजन तिथि - </span>{dateFormat(article.created_at)},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>रचना प्रकार - </span> {article.article_type} )
                </p>
              </div>

              <div className='text-2xl overflow-hidden border-b border-gray-300 min-h-96 p-5 leading-10 mb-3 mb-5'>
                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
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
              <div id="comment-section" className='py-2 px-4 grid grid-cols-8'>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment :</label>
                <div className="grid col-start-1 col-end-6">
                  <ReactTransliterate
                    value={comment}
                    onChangeText={(comment) => {setComment(comment); }}
                    renderComponent={(props) => <textarea  
                      {...props} 
                    />}
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    lang={'hi'}
                    placeholder="Write your comment here..."
                  />
                </div>
                <div className='col-start-1 col-end-6 grid justify-items-end mt-3'>
                  <div>
                    <button type="button" 
                      className="px-3 py-2 mx-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Submit
                    </button>
                    <button type="button" 
                      onClick={ resetComment }
                      className="px-3 py-2 text-xs font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div className='py-2 px-4'>
                <div className='font-bold mb-2'>Comments:</div>
                {
                  (article.comments.length === 0) ? 
                    (
                      <div className='text-gray-600'>
                        There is no comments available now.
                      </div>
                    )
                    :(
                      <div>Comment are available</div>
                    )
                }
              </div>
            </>
          ) : (
            <div>Loading ...</div>
          )
        }
      </div>
    </div>
  );
};

export default ArticleShow;