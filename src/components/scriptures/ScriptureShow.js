import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getScrArticles } from '../../actions/scriptures';
import RasikVani from './RasikVani';
import Stories from './Stories';

const ScriptureShow = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const { scripture, scr_articles } = useSelector(state => state.scripture);

  useEffect( () => {
    dispatch(getScrArticles(id));
  }, [id]);

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        {/* <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी - {scripture && scripture.name} 
        </div> */}
        <div className='grid grid-cols-12'>
          <div className='col-start-2 col-span-10 border-2 border-gray-2 pb-4 shadow-2xl page'>
            { scripture ? (
                <>
                  {(scripture.scripture_type === "रसिक वाणी") && <RasikVani key={1} scripture={scripture} />}
                  {(scripture.scripture_type === "कथायें") && <Stories key={2} scripture={scripture} />}
                </>
              ) : 'There is no scripture avaialable now.'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptureShow;