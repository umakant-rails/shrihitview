import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorArticles } from '../../../slices/public/authorSlice';
import shrihit from '../../../assets/images/shrihit.png';
import { dateFormat } from '../../../utils/utilityFunctions';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';

const PBAuthorShow = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [totalArticles, setTotalArticles] = useState(null);
  const {articles, total_articles} = useSelector(state => state.author);
  
  useEffect( ()=> {
    dispatch(getAuthorArticles({name: name, page: 1}));
  }, [dispatch, name]);

  useEffect( () => {
    if(articles){
      window.scrollTo({top: 0, behavior: 'instant'});
      setArticleList(articles);
      setTotalArticles(total_articles);
    }
  }, [articles, total_articles]);

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    dispatch(getAuthorArticles({name: name, page: page}));
  };

  return (
    <div className='grid md:col-md-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचनाकार/लेखक - {name}
        </div>
        {
          (articleList && articleList.length > 0) ? articleList.map( (article, index) => 
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
            <div className='text-lg text-center'>
              इस रचनाकार/लेखक के लिए कोई रचना उपलब्ध नहीं है।
            </div>
          )
        }
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          {
            totalArticles &&
            <Pagination 
              showWidget={5} 
              totalItems={totalArticles}
              itemsPerPage={ITEM_PER_PAGE}
              pageChangeHandler= {handlePageClick}
            />
          }
        </nav>
      </div>
    </div>
  );
};

export default PBAuthorShow;