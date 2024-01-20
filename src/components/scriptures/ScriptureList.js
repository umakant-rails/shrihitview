import React, { useEffect } from 'react';
import { getScriptures } from '../../actions/scriptures';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { imageNamefromScrName } from '../../utils/utilityFunctions';

let images = require.context('../../assets/images', true);

const ScriptureList = () => {
  const dispatch = useDispatch();
  const { scriptures } = useSelector(state => state.scripture );

  useEffect(() => {
    dispatch(getScriptures());
  }, []);

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी सूची 
        </div>
        <div className='grid grid-cols-12 gap-3'>
          {
            scriptures && scriptures.map( (scripture, index) => 
              <div key={index} className='col-span-2'>
                <Link to={`/pb/scriptures/${scripture.name_eng}`}>
                  <img 
                    src={images(`./${imageNamefromScrName(scripture.name_eng)}.png`)} 
                    alt="shit-hit" className='border h-60 border-violet-400 items-center'/>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ScriptureList;