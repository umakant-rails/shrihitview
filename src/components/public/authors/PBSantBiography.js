import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSantBiography } from '../../../slices/public/authorSlice';

const SantBiography = () => {
  const dispatch = useDispatch();
  const {name} = useParams();
  const { sant, related_sants } = useSelector(state => state.author);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'})
    dispatch(getSantBiography(name));
  }, [dispatch, name]);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचनाकार/लेखक - {sant ? sant.name : 'NA'}
        </div>
        {
          sant && (
            <div className='text-xl overflow-hidden py-2 px-2 mb-3'>
              {<div dangerouslySetInnerHTML={{__html: sant.biography}} />}
            </div>
          )
        }
        <div className='mt-5 mb-3 text-2xl font-bold text-amber-700'>
          इनको भी पढ़े :-
        </div>
        <div className='text-blue-700'>
          {
            related_sants && related_sants.map( (sant, index) =>
              <Link key={index} to={`/pb/authors/${sant.name_eng}/sant_biography`}>{sant.name}</Link>
            ).reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
      </div>
    </div>
  );
};

export default SantBiography;