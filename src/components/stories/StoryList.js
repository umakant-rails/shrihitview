import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStories } from '../../actions/stories';
import shrihit from "../../assets/images/shrihit.png"

const StoryList = () => {
  const dispatch = useDispatch();
  const {stories} = useSelector( state => state.story );

  useEffect( () => {
    dispatch(getStories());
  }, []);

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          भक्ति प्रसंग सूची
        </div>
        {
          stories && stories.map((story, index)=>
            <div key={index} className='grid grid-cols-12 gap-5 px-4 border-b border-b-gray-500 mb-5 pb-5'>
              <div className='col-span-4'>
                <Link to={`/pb/stories/${story.title}`} >
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </Link>
              </div>
              <div className='col-span-8'>
                <div className='text-2xl font-bold text-blue-800 text-amber-800 mb-3'>
                  <Link to={`/pb/stories/${story.title}`} >
                    {story.title}
                  </Link>
                </div>
                <div className='text-xl max-h-40 overflow-hidden mb-8'>
                  {<div dangerouslySetInnerHTML={{__html: story.story}} />}
                </div>
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
};

export default StoryList;