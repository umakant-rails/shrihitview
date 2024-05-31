import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { getArticleTypes } from '../../../slices/public/articleTypeSlice'; 
import { ITEM_PER_PAGE } from '../../../utils/types';

const PBArticleTypeList = () => {
  const dispatch = useDispatch();
  const [articleTypeList, setArticleTypeList] = useState([]);
  const [totalArticleTypes, setTotalArticleTypes] = useState(null);
  const { article_types, total_article_types } = useSelector( state => state.articleType );

  useEffect( () => {
    dispatch(getArticleTypes(''));
  }, [dispatch]);

  useEffect( () => {
    if(article_types){
      setArticleTypeList(article_types);
      setTotalArticleTypes(total_article_types);
    }
  }, [article_types, total_article_types]);

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    dispatch(getArticleTypes(page));
  };


  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचना प्रकार सूची 
        </div>
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700 bg-yellow-500">
              <th scope="col" className="px-2 py-3">क्रमांक</th>
              <th scope="col" className="px-2 py-3">रचना प्रकार</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {
              articleTypeList && articleTypeList.map( (type, index) =>
                <tr key={index}
                  className="border-b dark:border-gray-700 text-blue-500" >
                  <th scope="row" 
                    className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                  </th>
                  <th scope="row" 
                    className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                    <Link to={`/pb/article_types/${type.name}`} className='text-blue-600'>
                      {type.name}
                    </Link>
                  </th>
                </tr>
              )
            }
          </tbody>
        </table>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          {
            totalArticleTypes &&
            <Pagination 
              showWidget={5} 
              totalItems={totalArticleTypes}
              itemsPerPage={ITEM_PER_PAGE}
              pageChangeHandler= {handlePageClick}
            />
          }
        </nav>
      </div>
    </div>
  );
};

export default PBArticleTypeList;