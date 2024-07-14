import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getArticle } from '../../../slices/public/articleSlice';
import { dateFormat } from '../../../utils/utilityFunctions';
import Comment from '../../shared/Comment';

const ArticleShow = () => {
  const dispatch = useDispatch(); 
  const { id } = useParams();
  const { article } = useSelector( state => state.pbArticle );

  useEffect(()=>{
    dispatch(getArticle(id));
  }, [dispatch, id]);

  return (
    <div className='grid grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 col-span-12'>
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
              <div id="comment-section" >
                <Comment article={article} />
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