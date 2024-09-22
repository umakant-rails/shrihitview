import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { deleteArticle, getArticle } from '../../../slices/user/userArticleSlice';
import { confirmBeforeDeletion, dateFormat } from '../../../utils/utilityFunctions';
import { Link } from 'react-router-dom';
import Comment from '../../shared/Comment';

const ArticleShow = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { article, notice, article_deleted} = useSelector( state => state.userArticle);

  useEffect( () => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect( () => {
    if(article_deleted){ navigate('/articles'); }
  }, [navigate, article_deleted]);

  const deleteToArticle = (id) => {
    if(confirmBeforeDeletion()){ dispatch(deleteArticle(id)); }
  }

  return (
    <div className='grid md:grid-cols-12'>
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
                article && article.tags && article.tags.length > 0 && <div className='font-bold align-middle'>
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
              <div id="action-div" className="mb-6">
                <Link to={`/articles`} className="bg-blue-600 py-2 px-4 text-white mx-2 rounded">
                  Article List
                </Link>
                <Link to={`/articles/${article.id}/edit`} className="bg-blue-600 py-2 px-4 text-white mx-2 rounded">
                  Edit Article
                </Link>
                <Link to="#" className="bg-red-600 py-2 px-4 text-white mx-2 rounded" 
                  onClick={e => deleteToArticle(article.id)} >
                    Delete Article
                </Link>
              </div>
              <div id="comment-section" >
                <Comment article={article} />
              </div>
            </>
          ) : (
            notice ? (
              <div className="flex justify-center items-center h-96">
                <div className='bg-stone-600 rounded-md p-4 text-white font-bold text-3xl text-center'>
                  {notice}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-96">
                <div className='bg-stone-00 rounded-md p-4 text-blue-500 font-bold text-3xl text-center'>
                  Content is loading ...
                </div>
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default ArticleShow;