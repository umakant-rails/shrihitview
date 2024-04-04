import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import shrihit from "../../../assets/images/shrihit.png";
import { dateFormat } from '../../../utils/utilityFunctions';
import { getTagArticles } from '../../../actions/public/tags';

const PBTagShow = () => {
  const dispatch = useDispatch();
  const {name} = useParams();
  const { tags, articles } = useSelector(state => state.tag);

  useEffect( ()=> {
    window.scrollTo({top: 0, behavior: 'instant'});
    dispatch(getTagArticles(name));
  }, [dispatch, name]);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-12 lg:col-start-2 lg:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
					टैग्स - { name }
        </div>
        {
          articles ? articles.map( (article, index) => 
            <div key={index} className='grid md:grid-cols-12 shadow-xl sm:grid-cols-1 gap-2 pb-4 mb-4 border-b-2 border-gray-200'>
              <div className='lg:col-span-4 md:col-span-full'>
                <Link to={`/pb/articles/${article.hindi_title}`} >
                  <img src={shrihit} alt="shit-hit" className='border h-54 border-violet-400'/>
                </Link>
              </div>
              <div className='lg:col-span-8 md:col-span-full'>
                <Link to={`/pb/articles/${article.hindi_title}`} key={index}>
                  <div className='text-2xl px-2 text-amber-600 font-bold'>
                    {article.hindi_title}
                  </div>
                </Link>
                <div className='text-xl max-h-36 overflow-hidden py-2 px-2 mb-3'>
                  {<div dangerouslySetInnerHTML={{__html: article.content}} />}
                </div>
                <div>
                  <Link to={`/pb/article_types/${article.article_type}`} >
                    <span className='bg-orange-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                      {article.article_type}
                    </span>
                  </Link>
                  <Link to={`/pb/authors/${article.author}`}>
                    <span className='bg-green-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                      {article.author}
                    </span>
                  </Link>
                  <span className='bg-blue-600 px-3 py-1 mx-1 text-white rounded font-bold mb-2'>
                    {dateFormat(article.created_at)}
                  </span>
                </div>
              </div>
            </div> 
          ) : (
            <div className='text-center text-xl'>इस टैग्स के लिए कोई रचना उपलब्ध नहीं है।</div>
          )
        }
        <div className='mt-5 mb-3 text-2xl font-bold text-amber-700'>
          इनको भी पढ़े :-
        </div>
        <div className='text-blue-700 text-2xl px-6'>
          {
            tags.length > 0 ? tags.map( (tag, index) =>
              <Link key={index} to={`/pb/tags/${tag.name}`}>{tag.name}</Link>
            ).reduce((prev, curr) => [prev, ', ', curr]) : null
          }
        </div>
      </div>
    </div>
  );
};

export default PBTagShow;