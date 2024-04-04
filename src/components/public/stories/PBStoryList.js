import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStories } from '../../../actions/public/stories';
import shrihit from "../../../assets/images/shrihit.png"
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';

const PBStoryList = () => {
  const dispatch = useDispatch();
  const [currentStories, setCurrentStories] = useState([]);
  const [storyList, setStoryList] = useState([])
  const {stories} = useSelector( state => state.story );

  useEffect( () => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect( () => {
    setCurrentStories(stories.slice(0,ITEM_PER_PAGE));
    setStoryList(stories);
  }, [stories]);

  const handlePageClick = (event) => {
    const newOffset = parseInt(event.target.getAttribute('value'));
    const startingOffset = (newOffset > 0) ? (newOffset-1)*ITEM_PER_PAGE : 0;
    setCurrentStories(stories.slice(startingOffset, startingOffset+ITEM_PER_PAGE));
  };


  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          भक्ति प्रसंग सूची
        </div>
        {
          currentStories && currentStories.map((story, index)=>
            <div key={index} className='grid md:grid-cols-12 gap-5 px-4 border-b border-b-gray-500 mb-5 pb-5'>
              <div className='hidden lg:block lg:col-span-4'>
                <Link to={`/pb/stories/${story.title}`} >
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </Link>
              </div>
              <div className='md:col-span-12 lg:col-span-8'>
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
        {
          storyList &&
          <Pagination 
            showWidget={5} 
            totalItems={storyList.length}
            itemsPerPage={ITEM_PER_PAGE}
            pageChangeHandler= {handlePageClick}
          />
        }
      </div>
    </div>
  );
};

export default PBStoryList;