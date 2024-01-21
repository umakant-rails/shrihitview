import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStrota } from '../../actions/strota';
import shrihit from "../../assets/images/shrihit.png"

const StrotumList = () => {
  const dispatch = useDispatch();
  const {strota} = useSelector( state => state.strotum );

  useEffect( () => {
    dispatch(getStrota());
  }, []);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          भक्ति प्रसंग सूची
        </div>
        {
          strota && strota.map((strotum, index)=>
            <div key={index} className='grid md:grid-cols-12 gap-5 px-4 border-b border-b-gray-500 mb-5 pb-5'>
              <div className='hidden lg:block lg:col-span-4'>
                <Link to={`/pb/strota/${strotum.title}`} >
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </Link>
              </div>
              <div className='md:col-span-12 lg:col-span-8'>
                <div className='text-2xl font-bold text-blue-800 text-amber-800 mb-3'>
                  <Link to={`/pb/strota/${strotum.title}`} >
                    {strotum.title}
                  </Link>
                </div>
                <div className='text-xl max-h-40 overflow-hidden mb-8'>
                  {
                    strotum.articles && strotum.articles.map((article, index) =>
                      <div key={index} dangerouslySetInnerHTML={{__html: article.content}} />
                    )
                  }
                </div>
              </div>
            </div>
          )

        }
      </div>
    </div>
  );
};

export default StrotumList;