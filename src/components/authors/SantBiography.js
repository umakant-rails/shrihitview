import React,  { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSantBiography } from '../../actions/authors';

const SantBiography = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const { sant, related_sants } = useSelector(state => state.author);
  

  useEffect( ()=> {
    dispatch(getSantBiography(name));
  }, [name]);

  return (
    <div>
      {
       
        <div className='grid grid-cols-12'>
          <div className='col-start-2 col-span-10'>
            <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
              संत जीवनी - {sant && sant.name} 
            </div>
            <div className='col-start-2 col-span-7 text-xl'>
              {
                sant && (
                  <>
                    <div dangerouslySetInnerHTML={{__html: sant.biography}} />
                  </>
                )
              }
            </div>
            <div className='text-amber-600 text-2xl font-bold mt-5 mb-5'>
              इनके बारे भी पढ़े :- 
            </div>
            <div className='text-blue-700'>
              {
                related_sants && related_sants.map((sant, index)=>
                  <Link to="#" className=''>{sant.name}</Link>
                ).reduce((prev, curr) => [prev, ',  ', curr])
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SantBiography;