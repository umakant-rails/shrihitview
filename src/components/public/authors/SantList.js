import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSants } from '../../../actions/authors';
import shrihit from "../../../assets/images/shrihit.png";

const SantList = () => {
  const dispatch = useDispatch();
  const {sants} = useSelector(state => state.author);

  useEffect( ()=> {
    dispatch(getSants());
  }, []);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          संत जीवनी  
        </div>
        {
          sants && sants.map((sant, index)=>
            <div key={index} className='grid md:grid-cols-12 gap-5 px-4 border-b border-b-gray-500 mb-5 pb-5'>
              <div className='hidden lg:block lg:col-span-4'>
                <Link to={`/pb/authors/${sant.name_eng}/sant_biography`} >
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </Link>
              </div>
              <div className='md:col-span-12 lg:col-span-8'>
                <div className='text-2xl font-bold text-blue-800 text-amber-800 mb-3'>
                  <Link to={`/pb/authors/${sant.name_eng}/sant_biography`} >
                    {sant.name}
                  </Link>
                </div>
                <div className='text-xl max-h-40 overflow-hidden mb-8'>
                  {<div dangerouslySetInnerHTML={{__html: sant.biography}} />}
                </div>
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
};

export default SantList;