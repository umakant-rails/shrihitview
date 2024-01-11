import React, { useEffect } from 'react';
import { getAuthors } from '../../actions/authors';
import { useDispatch, useSelector } from 'react-redux';

const AuthorList = () => {
  const dispatch = useDispatch();
  const { authors } = useSelector( state => state.author );

  useEffect( () => {
    dispatch(getAuthors());
  }, []);

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचनाकार/लेखक सूची 
        </div>
        {
          authors && authors.map( (author, index) => 
            <div key={index}>
              <div className='text-xl text-lime-800 font-bold bg-lime-100 py-2 px-2 rounded-md'>{author.name}</div>
              <div class="text-sm px-5 py-2">
                <span className='font-bold'>रचनाये-</span>{author.articles.length}
              </div> 
            </div>
          )
        }
      </div>
    </div>
  );
};

export default AuthorList;