import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { imageNamefromScrName } from '../../../utils/utilityFunctions';
import { getScriptures } from '../../../actions/public/scriptures';
let images = require.context('../../../assets/images', true);

const PBScriptureList = () => {
  const dispatch = useDispatch();
  const { scriptures } = useSelector(state => state.scripture );

  const imageExist = (scripture) => {
    let imageArr = require.context('../../../assets/images', false).keys();
    let scrImage = `./${imageNamefromScrName(scripture.name_eng)}.png`;
    return imageArr.indexOf(scrImage) >= 0;
  }
  useEffect(() => {
    dispatch(getScriptures());
  }, []);

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
                <Link to={`/pb/scriptures/${scripture.name_eng}`}>
                  {
                    imageExist(scripture) ? (
                      <img 
                        src={images(`./${imageNamefromScrName(scripture.name_eng)}.png`)} 
                        alt="shit-hit" className='border h-60 border-violet-400 items-center'/>
                    ): (
                      <img 
                        src='' alt={scripture.name_eng} 
                        className='border min-w-40 max-w-40 h-60 border-violet-400 items-center'/>
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