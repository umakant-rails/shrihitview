import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { getArticle } from '../../../actions/articles';
import { dateFormat } from '../../../utils/utilityFunctions';
import { ReactTransliterate } from "react-transliterate";
import { AuthContext } from "../../../services/AuthContext";

const ArticleShow = () => {
  const dispatch = useDispatch(); 
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const { article } = useSelector( state => state.article );
  const {currentUser, setCurrentUser} = useContext(AuthContext);

  useEffect(()=>{
    dispatch(getArticle(id));
  }, [id]);

  const onInputChange = (event) => {
    const {value} = event.target;
    setComment(value);
  }
  const resetComment = () => { 
    setComment("");
  }

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-end-11'>
        { article ?
          ( <>
              <div className='article-header-violet'>
                <p className='text-2xl font-bold text-cyan-800 mb-1'>{article.hindi_title}</p>
                <p>
                  ( <span className='font-bold text-red-500 text-medium'>रचनाकार - </span>{article.author},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>सृजन तिथि - </span>{dateFormat(article.created_at)},&nbsp;&nbsp;  
                  <span className='font-bold text-red-500 text-medium'>रचना प्रकार - </span> {article.article_type} )
                </p>
              </div>
              <div className='text-xl overflow-hidden shadow-2xl p-5 mb-3 mb-5'>
                {<div dangerouslySetInnerHTML={{__html: article.content}} />}
              </div>
              <div id="comment-section" className='py-2 grid grid-cols-8'>
                <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment :</label>
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
                {/* <textarea 
                  id="message" rows="3" 
                  onChange={onInputChange}  value = {comment} 
                  className="block p-2.5 w-full col-start-1 col-end-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Write your comment here...">
                </textarea> */}
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
              <div className='py-2'>
                <div className='font-bold mb-2'>Comments:</div>
                {
                  (article.comments.length === 0) ? 
                    (
                      <div className='text-gray-600'>
                        There is not comments available now.
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