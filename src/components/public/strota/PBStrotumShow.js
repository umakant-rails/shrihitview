import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStrotum } from '../../../slices/public/strotaSlice';

const PBStrotumShow = () => {
  const dispatch = useDispatch();
  const {title} = useParams();
  let prevArticleType = ''; 

  const { strotum, strota, strotum_articles } = useSelector(state => state.strotum);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'});
    dispatch(getStrotum(title));
  }, [dispatch, title]);

  const getArticleTypeElement = (article) => {
    if(prevArticleType !== article.article_type){
      prevArticleType = article.article_type;
      return (
        <div className={`mb-2 text-center text-stone-700 text-2xl py-2 border-b 
          border-1 border-green-800  
          bg-gradient-to-b from-lime-400 via-lime-200 to-lime-50 font-bold`}>
          {article.article_type}
        </div>
      )
    }
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          आरती/स्तोत्र - { strotum && strotum.name }
        </div>
        <div className='grid md:grid-cols-12 gap-2'>
          <div className='md:col-span-8 shadow-xl'>
            {
              <div className='leading-10 mb-8 px-2'>
                {
                  strotum_articles ? strotum_articles.map((article, index) =>
                    <div key={index}>
                      {getArticleTypeElement(article)}
                      <div className={`text-center text-2xl font-bold mb-3 leading-10
                        ${index%2 === 0 ? 'text-cyan-600' : 'text-violet-600'}`} 
                        dangerouslySetInnerHTML={{__html: article.content}} />
                      <div className='text-center text-xl mb-3' 
                        dangerouslySetInnerHTML={{__html: article.interpretation}} />
                    </div>
                  ) : (
                    <div className='text-lg text-center'>
                      यह आरती/स्तोत्र उपलब्ध नहीं है।
                    </div>
                  )
                }
              </div>
            }
          </div>
          <div className='mb-5 md:col-span-4'>
            <div className='article-header-violet text-xl'>
              सम्बन्धित बिषय
            </div>
            {
              strota && (
                <ul className='list-none'>
                  { 
                    strota.map((strotum, index) =>
                      <Link key={index} to={`/pb/strota/${strotum.name}`}>
                        <li className='py-3 px-2 border-b border-gray-300 text-xl text-blue-500'>
                          {strotum.name}
                        </li>
                      </Link>
                    )
                  }
                </ul> 
              ) 
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBStrotumShow;