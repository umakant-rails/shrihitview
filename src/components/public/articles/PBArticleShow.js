import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { getArticle } from '../../../actions/public/articles';
import { dateFormat } from '../../../utils/utilityFunctions';
import { ReactTransliterate } from "react-transliterate";
import { AuthContext } from "../../../services/AuthContext";

const ArticleShow = () => {
  const dispatch = useDispatch(); 
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const { article } = useSelector( state => state.pbArticle );
  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    dispatch(getArticle(id));
  }, [dispatch, id]);

  const resetComment = () => { 
    setComment("");
  }

  return (
    <div className='grid grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        { article ?
          ( <> {/*article-header-violet*/}
              <div className={`bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-50 
                border-y border-x-4 border-zinc-800 px-3 py-2`}>
                <p className='text-2xl font-bold text-cyan-800 mb-1 px-2'>{article.hindi_title}</p>
                <p className='px-2'>
                  ( <span className='font-bold text-red-500 text-medium'>रचनाकार - </span>{article.author},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>सृजन तिथि - </span>{dateFormat(article.created_at)},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>रचना प्रकार - </span> {article.article_type} )
                </p>
              </div>

              <div className='text-2xl overflow-hidden shadow-2xl min-h-96 p-5 leading-10 mb-3 mb-5'>
                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
              </div>
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
                  { currentUser ? (
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
                    ) : (
                      <div>
                        <button type="button" 
                          onClick={() => alert('Please Login to Comment at this article.')}
                          className="px-3 py-2 mx-2 text-xs font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Submit
                        </button>
                        <button type="button" 
                          onClick={() => alert('Please Login to Comment at this article.')}
                          className="px-3 py-2 text-xs font-medium text-center text-white bg-gray-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Cancel
                        </button>
                      </div>
                    )
                  }
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