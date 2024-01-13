import React, { useEffect, useState } from 'react';
import { getAuthors } from '../../actions/authors';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';

const AuthorList = () => {
  const dispatch = useDispatch();
  const [currentAuthors, setCurrentAuthors] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(10);
  const { authors } = useSelector( state => state.author );
  
  const handlePageClick = (event) => {
    const newOffset = parseInt(event.target.getAttribute('value'));
    const startingOffset = (newOffset > 0) ? (newOffset-1)*itemPerPage : 0;
    setCurrentAuthors(authors.slice(startingOffset, startingOffset+itemPerPage));
  };

  useEffect( () => {
    dispatch(getAuthors());
  }, []);

  useEffect( () => {
    if(authors){
      setCurrentAuthors(authors.slice(0, itemPerPage));
    }
  }, [authors])

  return (
    <div className='grid grid-cols-12'>
      <div className='col-start-2 col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रचनाकार/लेखक सूची 
        </div>
        {
          currentAuthors && currentAuthors.map( (author, index) => 
            <div key={index}>
              <div className='text-xl text-red-800 font-bold bg-red-50 py-3 px-2 border border-blue-800 rounded-sm'>{author.name}</div>
              <div className="text-sm px-5 py-2">
                <span className='font-bold'>रचनाये-</span>{author.articles ? author.articles.length : 0}
              </div> 
            </div>
          )
        }
        {
          authors &&
            <Pagination 
              showWidget={7} 
              totalItems={authors}
              itemsPerPage={itemPerPage}
              pageChangeHandler= {handlePageClick}
            />
        }
      </div>
    </div>
  );
};

export default AuthorList;