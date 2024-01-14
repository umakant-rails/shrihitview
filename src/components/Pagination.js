import React, {useState } from 'react';

const Pagination = ({totalItems, itemsPerPage, pageChangeHandler, showWidget}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageArr, setPageArr] = useState(Array.from(Array(showWidget), (e, i) => i+1));
  const [firstDots, setFirstDots] = useState(false);
  const [lastDots, setLastDots] = useState(true);
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  const clickHandler = async (event) => {
    const currentSelectPage = parseInt(event.target.getAttribute('value'));
    if(currentSelectPage > 0 && currentSelectPage < totalPages+1){
      setCurrentPage(currentSelectPage);
    }
    
    if(currentSelectPage > showWidget/2 && totalPages-currentSelectPage >= showWidget){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+currentSelectPage));
      setFirstDots(true);setLastDots(true);
    } else if (totalPages-currentSelectPage+1 <= showWidget){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+(totalPages-showWidget+1)));
      setFirstDots(true);setLastDots(false);
    } else if(currentSelectPage <= showWidget/2){
      setPageArr(Array.from(Array(showWidget), (e, i) => i+1));
      setFirstDots(false);setLastDots(true);
    }
  }

  return (
    totalPages && (
      <div className="flex w-full items-center justify-center mt-5">
        <a href="#" value='1' 
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 rounded-l border border-gray-500 ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'<< First'}
        </a>
        <a href="#" value={(currentPage === 1) ? 1 : currentPage-1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 border-y border-r border-gray-500 ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'< Prev'}
        </a>
        {
          (firstDots) && (
            <button className='px-4 py-2 border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        {
          pageArr.map((count, index) => 
            <a href="#" value={count}
              onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
              key={index} className={`px-4 py-2 border-y border-r ${currentPage === count ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-500'} hover:bg-blue-500 hover:text-white`} >
              {count}
            </a>
          )
        }
        {
          (lastDots) && (
            <button className='px-4 py-2 border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        <a href="#" value={(currentPage === totalPages) ? totalPages : currentPage+1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 border-y border-r border-gray-500 ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'Next >'}
        </a>
        <a href="#" value={totalPages}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 rounded-r border-y border-r border-gray-500 ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'Last >>'}
        </a>
      </div>
    )
  );
};

export default Pagination;