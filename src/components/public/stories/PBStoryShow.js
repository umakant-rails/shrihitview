import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStory } from '../../../actions/public/stories';

const PBStoryShow = () => {
  const dispatch = useDispatch();
  const {title} = useParams();
  const { story, stories } = useSelector(state => state.story);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'})
    dispatch(getStory(title ));
  }, [dispatch, title]);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          भक्ति प्रसंग - {story ? story.title : 'NA'}
        </div>
        {
          story && (
            <div className='text-xl overflow-hidden py-2 px-2 mb-3'>
              {<div dangerouslySetInnerHTML={{__html: story.story}} />}
            </div>
          )
        }
        <div className='mt-5 mb-3 text-2xl font-bold text-amber-700'>
          इनको भी पढ़े :-
        </div>
        <div className='text-blue-700 text-xl px-6'>
          {
            stories.length > 0 && stories.map( (story, index) =>
              <Link key={index} to={`/pb/stories/${story.title}y`}>{story.title}</Link>
            ).reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
      </div>
    </div>
  );
};

export default PBStoryShow;