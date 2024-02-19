import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStrotum } from '../../../actions/public/strota';

const PBStrotumShow = () => {
  const dispatch = useDispatch();
  const {title} = useParams();
  const { strota, strotum } = useSelector(state => state.strotum);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'});
    dispatch(getStrotum(title));
  }, [title]);
  
  // const getStrotaList = (strota) => {
  //   const strotaArr = strota.length !== 0 ? strota.map( (strotum, index) =>
  //     <Link key={index} to={`/pb/strota/${strotum.title}`}>{strotum.title}</Link>
  //   ).reduce((prev, curr) => [prev, ', ', curr]) : null;
  // }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          आरती/स्तोत्र - {strotum ? strotum.title : 'NA'}
        </div>
        {
          <div className='text-2xl overflow-hidden mb-8'>
            {
              strotum && strotum.articles && strotum.articles.map((article, index) =>
                <div key={index} dangerouslySetInnerHTML={{__html: article.content}} />
              )
            }
          </div>
        }
        <div className='mt-5 mb-3 text-2xl font-bold text-amber-700'>
          इनको भी पढ़े :-
        </div>
        <div className='text-blue-700 text-2xl px-6'>
          {
            strota.length > 0 ? strota.map( (strotum, index) =>
              <Link key={index} to={`/pb/strota/${strotum.title}`}>{strotum.title}</Link>
            ).reduce((prev, curr) => [prev, ', ', curr]) : null
          }
        </div>
      </div>
    </div>
  );
};

export default PBStrotumShow;