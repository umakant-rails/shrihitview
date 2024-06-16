import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { imageNamefromScrName } from '../../../utils/utilityFunctions';
import { getScriptures } from '../../../slices/public/scriptureSlice';
let images = require.context('../../../assets/images/scripture', true);

const PBScriptureList = () => {
  const dispatch = useDispatch();
  const { scriptures } = useSelector(state => state.scripture );

  const imageExist = (scripture) => {
    let imageArr = require.context('../../../assets/images/scripture', false).keys();
    let scrImage = `./${imageNamefromScrName(scripture.name_eng)}.png`;
    return imageArr.indexOf(scrImage) >= 0;
  }
  useEffect(() => {
    dispatch(getScriptures());
  }, [dispatch]);

  const getLink = (scripture ) => {
    if([2,4,5].indexOf(scripture.scripture_type_id)>= 0){
      return `/pb/scriptures/${scripture.name_eng}`;
    } else if (scripture.scripture_type_id === 3){
      return `/pb/scriptures/stories/${scripture.name_eng}`
    } else if (scripture.scripture_type_id === 1){
      return `/pb/scriptures/granth/${scripture.name_eng}`
    }
  }
  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी सूची 
        </div>
        <div className='grid md:grid-cols-12 gap-3'> 
          {
            scriptures && scriptures.map( (scripture, index) => 
              <div key={index} className='md:col-span-4 lg:col-span-3 flex justify-center'>
                <Link to={getLink(scripture)} >
                  {
                    imageExist(scripture) ? (
                      <img 
                        src={images(`./${imageNamefromScrName(scripture.name_eng)}.png`)} 
                        alt="shit-hit" className='border h-60 border-violet-400 items-center rounded'/>
                    ): (
                      <div className='border h-60 border-violet-400 p-4 items-center rounded font-bold' 
                        style={{width: '150px', height: '240px' }}>
                        {scripture.name}
                      </div>
                    )
                  }
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PBScriptureList;