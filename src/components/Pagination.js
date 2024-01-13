import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({totalItems, itemsPerPage, pageChangeHandler, showWidget}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageArr, setPageArr] = useState(Array.from(Array(showWidget), (e, i) => i+1));
  const [firstDots, setFirstDots] = useState(false);
  const [lastDots, setLastDots] = useState(true);
  const totalPages = Math.ceil(totalItems.length/itemsPerPage);

  const clickHandler = async (event) => {
    const currentSelectPage = parseInt(event.target.getAttribute('value'));
    if(currentSelectPage > 0 && currentSelectPage < totalPages+1){
      setCurrentPage(currentSelectPage);
    }
    
    if(currentSelectPage > showWidget/2+1 && totalPages-currentSelectPage >= showWidget){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+currentSelectPage));
      setFirstDots(true);setLastDots(true);
    } else if (totalPages-currentSelectPage+1 <= showWidget){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+(totalPages-showWidget+1)));
      setFirstDots(true);setLastDots(false);
    } else if(currentSelectPage < showWidget/2+1){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+1));
      setFirstDots(false);setLastDots(true);
    }
  }

  return (
    totalPages && (
      <div className="flex w-full items-center gap-2 mt-5">
        <Link to="# "value='1' 
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 mx-1 rounded border ${currentPage === 1 ? 'border-gray-300' : 'border-gray-500 hover:bg-blue-500 hover:text-white'}`}
        >
          {'<< First'}
        </Link>
        <Link to="#" value={(currentPage === 1) ? 1 : currentPage-1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 mx-1 rounded border ${currentPage === 1 ? 'border-gray-300' : 'border-gray-500 hover:bg-blue-500 hover:text-white'}`}
        >
          {'< Prev'}
        </Link>
        {
          (firstDots) && (
            <button className='px-4 py-2 mx-1 rounded border border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        {
          pageArr.map((count, index) => 
            <Link to="#" value={count}
              onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
              key={index} className={`px-4 py-2 mx-1 rounded border ${currentPage === count ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-500'} hover:bg-blue-500 hover:text-white`} >
              {count}
            </Link>
          )
        }
        {
          (lastDots) && (
            <button className='px-4 py-2 mx-1 rounded border border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        <Link to="#" value={(currentPage === totalPages) ? totalPages : currentPage+1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 mx-1 rounded border ${currentPage === totalPages ? 'border-gray-300' : 'border-gray-500 hover:bg-blue-500 hover:text-white'}`}
        >
          {'Next >'}
        </Link>
        <Link to="#" value={totalPages}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 mx-1 rounded border ${currentPage === totalPages ? 'border-gray-300' : 'border-gray-500 hover:bg-blue-500 hover:text-white'}`}
        >
          {'Last >>'}
        </Link>
      </div>
    )
  );
};

export default Pagination;