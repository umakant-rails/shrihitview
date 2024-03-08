import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../../actions/public/tags';


const PBTagList = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.tag );
  
  useEffect( () => {
    dispatch(getTags())
  }, []);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          टैग्स सूची 
        </div>
        <div className='col-start-2 col-span-10'>
          <div className='flex flex-wrap content-center'>
            {
              tags && tags.map( (tag, index) =>
                <Link key={index} to={`/pb/tags/${tag.name}`}>
                  <div className={`text-white font-bold bg-gradient-to-r from-blue-400 
                    via-blue-600 to-blue-800 hover:bg-gradient-to-br focus:ring-4 
                    focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
                    font-medium rounded-lg text-sm px-6 py-3 text-center me-4 mb-4`}>
                    {tag.name}
                  </div>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBTagList;