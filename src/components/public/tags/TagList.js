import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../../actions/tags';


const TagList = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.tag );
  
  useEffect( () => {
    dispatch(getTags())
  }, []);

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          टैग्स सूची 
        </div>
        <div className='col-start-2 col-span-10'>
          <div className='flex flex-wrap content-center'>
            {
              tags && tags.map( (tag, index) =>
                <Link key={index} to={`/pb/contexts/${tag.name}`}>
                  <div className={`text-white font-bold bg-gradient-to-r from-blue-400 
                    via-blue-600 to-blue-800 hover:bg-gradient-to-br focus:ring-4 
                    focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
                    font-medium rounded-lg text-sm px-6 py-3 text-center me-4 mb-4`}>
                    {tag.name}
                  </div>
                </Link>
              )
            }
          </div>
        </div>
        {/* <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700 bg-yellow-500">
              <th scope="col" className="px-2 py-3">क्रमांक</th>
              <th scope="col" className="px-2 py-3">रचना प्रकार</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {
              contexts && contexts.map( (type, index) =>
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
        </table> */}
      </div>
    </div>
  );
};

export default TagList;