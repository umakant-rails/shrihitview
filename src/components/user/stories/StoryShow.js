import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getStory, deleteStory } from '../../../slices/user/userStorySlice';

const StoryShow = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const { story, storyDeleted } = useSelector( state => state.userStory);

  useEffect( () => {
    dispatch(getStory(id));
  }, [dispatch, id]);
  
  useEffect( () => {
    if(storyDeleted){ navigate('/stories'); }
  }, [navigate, storyDeleted]);

  const deleteToStory = (id) =>{
    dispatch(deleteStory(id, 'show'));
  }

  return (
    <div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना - {story && story.title}
          {/* {
            story && 
            <p className='text-base text-fuchsia-700'>
              ( 
                रचनाकार - <span className='text-blue-600'>{story.author ? story.author.name : 'NA'}</span> ,&nbsp;
                सृजन तिथि - <span className='text-blue-600'>{dateFormat(story.created_at)}</span>&nbsp; 
              )
            </p>
          } */}
        </div>
        <div className="text-xl pb-4 mb-4">
          {story && <div dangerouslySetInnerHTML={{__html: story.story}} />}
        </div>
        {
          story &&
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
        }
      </div>
    </div>
  );
};

export default StoryShow;