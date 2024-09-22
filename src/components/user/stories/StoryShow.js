import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getStory, deleteStory } from '../../../slices/user/userStorySlice';
import { confirmBeforeDeletion } from '../../../utils/utilityFunctions';

const StoryShow = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const { story, story_deleted, loading, notice } = useSelector( state => state.userStory);

  useEffect( () => {
    dispatch(getStory(id));
  }, [dispatch, id]);
  
  useEffect( () => {
    if(story_deleted){ navigate('/stories'); }
  }, [navigate, story_deleted]);

  const deleteToStory = (id) =>{
    if(confirmBeforeDeletion()){ dispatch(deleteStory({id:id, origin_page:'show'})); }
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना - {story && story.title}
        </div>
        {
          story ? 
          (
            <>
              <div className="text-xl pb-4 mb-4">
                {<div dangerouslySetInnerHTML={{__html: story.story}} />}
              </div>
              <div className=''>
                <Link to="/stories" className='bg-blue-500 px-3 py-2 text-white mr-2 rounded border-blue-600 border'>
                  संत चरित्र/प्रेरक प्रसंग सूची
                </Link>
                <Link to={`/stories/${story.id}/edit`} className='bg-blue-500 px-3 py-2 text-white mr-2 rounded border-blue-600 border'>
                  संत चरित्र/प्रेरक प्रसंग अद्यतन करे 
                </Link>
                <Link to="#" onClick={e => deleteToStory(story.id)} className='bg-red-600 px-3 py-2 text-white mr-2 rounded border-red-700 border'>
                  संत चरित्र/प्रेरक प्रसंग डिलीट करे
                </Link>
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

export default StoryShow;