import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from "react-transliterate";
import { createComment, updateComment, replyComment, deleteComment } from '../../slices/user/userCommentSlice';
import { dateFormat } from '../../utils/utilityFunctions';
import { AuthContext } from "../../services/AuthContext";

const Comment = ({article}) => {
  const dispatch = useDispatch();
  const [commentList, setCommentList] = useState(article.comments);
  //const [actionType, setActionType] = useState('');
  const [activeComment, setActiveComment] = useState('')
  const {currentUser} = useContext(AuthContext);
  const [formValues, setFormValues] = useState({parent_id: article.id, parent_name: 'Article', comment: ''});
  const [formValues2, setFormValues2] = useState({parent_id: article.id, parent_name: 'Comment', comment: ''});
  const {comments, loading} = useSelector(state => state.userComment);

  useEffect( () => {
    if(comments){ 
      setCommentList(comments);
      setActiveComment('');
      setFormValues(formValues => ({...formValues, comment: ''}));
    }
  }, [comments]);

  const createAComment = () => {
    if(formValues.comment){
      dispatch(createComment({article: article, form: formValues}));
    } else{
      alert('Please Write down your comment.')
    }
  }
  const editOrReplyComment = () => {
    if(formValues2.comment){
      if(formValues2.action_type === 'edit'){
        dispatch(updateComment({article: article, form: formValues2}));
      } else {
        dispatch(replyComment({article: article, form: formValues2}));
      }
    } else {
      alert('Please Write down your comment.')
    }
  }
  const openReplyCommentBox = (comment, parent_comment) =>{
    let blockId = `cmt-reply-${comment.id}`;
    if(activeComment === blockId){
      setActiveComment(''); setFormValues2(formValues2 => ({}));
    } else {
      setActiveComment(blockId);
      setFormValues2(formValues2 => ({
        ...formValues2, comment: '', action_type: 'reply', 
        parent_id: parent_comment ? parent_comment.id : comment.id, 
        parent_name: 'Comment'
      }))
    }
  }
  const openEditCommentBox = (comment) => {
    let blockId = `cmt-edit-${comment.id}`;
    if(activeComment === blockId){
      setActiveComment('');
      setFormValues2(formValues2 => ({}));
    } else {
      setActiveComment(blockId);
      setFormValues2(formValues2 => ({
        ...formValues2, action_type: 'edit', comment: comment.comment,
        parent_id: comment.id, parent_name: 'Comment'
      }))
    }
  }
  const deleteAComment = (comment) => {
    dispatch(deleteComment({article: article, comment_id: comment.id}))
  }
  const resetComment = () => { 
    setFormValues(formValues => ({
      ...formValues, comment: '', parent_id: article.id, parent_name: 'Article'
    }));
  }
  const cancelComment = () => { setActiveComment(''); setFormValues2(formValues2 => ({})); }

  const commentBox = () => {
    return ( 
      <>
        <ReactTransliterate
          value={formValues.comment}
          onChangeText={(comment) => {setFormValues(formValues => ({...formValues, comment: comment})) }}
          renderComponent={(props) => <textarea  
            {...props} 
          />}
          rows="2"
          className={`block p-2.5 w-full mb-2 text-sm text-gray-900 bg-gray-50 rounded border-b 
            border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500`}
          lang={'hi'}
          placeholder="Write your comment here..."
        />
        {
        currentUser ? (
          <div className='flex justify-end'>
            <button type="button" onClick={createAComment}
              disabled = {loading}
              className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white 
              ${loading ? 'bg-gray-400': 'bg-blue-700'}  rounded-lg hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-gray-500 dark:bg-gray-300 dark:hover:bg-gray-500 
              dark:focus:ring-gray-600`}>
                Post
            </button>
            <button type="button" onClick={resetComment}
              className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white 
                bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none 
                focus:ring-gray-500 dark:bg-gray-300 dark:hover:bg-gray-500 
                dark:focus:ring-gray-600`}>
                Reset
            </button>
          </div>
          ) : (
            <div className='flex justify-end'>
              <button type="button" onClick={e => alert('Please login first to comment.')}
                className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white 
                  bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none 
                  focus:ring-gray-500 dark:bg-gray-300 dark:hover:bg-gray-500 
                  dark:focus:ring-gray-600`}>
                  Post
              </button>
              <button type="button" onClick={e => alert('Please login first to comment.')}
                className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white 
                  bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none 
                  focus:ring-gray-500 dark:bg-gray-300 dark:hover:bg-gray-500 
                  dark:focus:ring-gray-600`}>
                  Reset
              </button>
            </div>
          )
        }
      </>
    )
  }
  const replyEditCommentBox = () => {
    return ( 
      <>
        <ReactTransliterate
          value={formValues2.comment}
          onChangeText={(comment) => {setFormValues2(formValues2 => ({...formValues2, comment: comment})) }}
          renderComponent={(props) => <textarea  
            {...props} 
          />}
          rows="2"
          className={`block p-2.5 w-full mb-2 text-sm text-gray-900 bg-gray-50 rounded border-b 
            border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500`}
          lang={'hi'}
          placeholder="Write your comment here..."
        />
        <div className='flex justify-end'>
          <button type="button" onClick={editOrReplyComment}
            disabled = {loading}
            className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white 
              ${loading ? 'bg-gray-400': 'bg-blue-700'}  
              rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
              {formValues2.action_type === 'edit' ? 'Update' : 'Reply' }
          </button>
          <button type="button" onClick={cancelComment}
            className={`px-3 py-2 mx-2 w-auto text-xs font-medium text-center text-white bg-gray-500 
              rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
              Cancel
          </button>
        </div>
      </>
    )
  }

  const createCommentList = (comment, parent_cmt) => {
    return (
      <div className='text-gray-500 mb-2 px-2 py-1 bg-gray-100'>
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className={`inline-flex items-center mr-2 text-sm text-gray-700 dark:text-white 
              font-semibold`}>
              <div className={`w-6 h-6 uppercase bg-pink-600 text-white text-xs px-0.5 py-1 
                rounded-full mr-2`}>
                {comment.user.slice(0,2)}
              </div>
              {/* <img className="mr-2 w-6 h-6 rounded-full" src={logo} alt={comment.user.slice(0,2)}/> */}
              <span className='capitalize'>{comment.user}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                {dateFormat(comment.created_at, true)}
              </time>
            </div>
          </div>
        </footer>
        <div className={`${activeComment === `cmt-edit-${comment.id}` ? 'hidden' : ''} 
          text-gray-500 dark:text-gray-400 ms-1`}>
          {comment.comment}
        </div>
        <div className={` ${ activeComment === `cmt-edit-${comment.id}` ? '' : 'hidden'}
          ps-2 pr-3 pt-1 pb-2 mb-1`}>
          {replyEditCommentBox()}
        </div>
        <div className="flex items-center mt-2 space-x-4">
          <div className='inline-flex' id={`comment-icon-${comment.id}`}>
            {
              currentUser ? (
                <div className='inline-flex text-blue-500 text-sm mr-4 cursor-pointer'
                  onClick={(e) => openReplyCommentBox(comment, parent_cmt) } >
                  <svg className="w-5 h-5 text-blue-800 dark:text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954Z"/>
                  </svg>
                  <span className='hidden md:block font-bold'>Reply</span>
                </div>
              ) : (
                <div className='inline-flex text-gray-500 text-sm mr-4 cursor-pointer'
                  onClick={(e) => alert('Please login first to comment write down.') } >
                  <svg className="w-5 h-5 text-gray-800 dark:text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954Z"/>
                  </svg>
                  <span className='hidden md:block font-bold'>Reply</span>
                </div>
              )
            }
            {
              (currentUser && currentUser.id === comment.user_id) && (
                <>
                  
                  <div className="inline-flex text-blue-500 text-sm mr-4 cursor-pointer"
                    onClick={() => openEditCommentBox(comment)}>
                    <svg className="w-5 h-5 text-blue-500  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                    <span className='hidden md:block  font-bold'>Edit</span>
                  </div>
                  <div className="inline-flex text-red-500 text-sm mr-4 cursor-pointer"
                    onClick={() => deleteAComment(comment)}>
                    <svg className="w-5 h-5 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                    <span className='hidden md:block font-bold'>Delete</span>
                  </div>
                </>
              )
            }
          </div>
        </div>
        <div className={`col-span-11 ${ activeComment === `cmt-reply-${comment.id}` ? '' : 'hidden'}`}>
          {replyEditCommentBox()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='px-4 md:grid md:grid-cols-12' key="comment-box">
        <div className='font-bold mb-2 col-span-12'>Your Comment:</div>
        <div className='md:col-span-8' >
          {commentBox()}
        </div>
      </div>
      <div className='py-2 px-4 sm:grid sm:grid-cols-12' key="comment-list">
        <div className='font-bold mb-2 col-span-12'>Comments:</div>
          {
            commentList ? commentList.map( (comment, index) => {
              return (
                <div key={index} className='col-span-8 border-b border-gray-400 mb-2'>
                  {createCommentList(comment, null)}
                  {comment.comments && comment.comments.map((cmt, index) => {
                    return (
                      <div className='ml-4 lg:ml-8' key={`child-cmt-${index}`}>
                        {/* <div className='col'></div>
                        <div className='col-span-11'> */}
                          {createCommentList(cmt, comment)}
                        {/* </div> */}
                      </div>
                    )
                  })}
                </div>
              )}
            ) : (
              <div>There is no comments available now.</div>
            )
          }
        
      </div>
    </div>
  );
};

export default Comment;