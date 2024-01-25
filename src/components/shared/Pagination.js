import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({totalItems, itemsPerPage, pageChangeHandler, showWidget}) => {
  const [currentPage, setCurrentPage] = useState(1);
  //const [displayWidget, setDisplayWidget] = useState(showWidget);
  const [pageArr, setPageArr] = useState([]);
  const [firstDots, setFirstDots] = useState(false);
  const [lastDots, setLastDots] = useState(false);
  //const [totalPages, setTotalPages] = useState(0);
  
  //const totalPages = Math.ceil(totalItems/itemsPerPage);
  

  let pgArr = [];
  let totalPages = Math.ceil(totalItems/itemsPerPage);
  let displayWidget = showWidget;
  if(totalPages > showWidget){
    pgArr = Array.from(Array(showWidget), (e, i) => i+1);
  } else { 
    pgArr = Array.from(Array(totalPages), (e, i) => i+1);
    displayWidget = totalPages;
  }

  useEffect( () => {
    setPageArr(pgArr);
    setCurrentPage(1);
    setFirstDots(false);
    (totalPages > displayWidget) ? setLastDots(true): setLastDots(false);
    
  }, [totalItems]);

  // useEffect( () => {
  //   let pageQuantities = Math.ceil(totalItems/itemsPerPage);
  //   setTotalPages(pageQuantities);
  //   setCurrentPage(1);setFirstDots(false); setLastDots(false);
  //   if(pageQuantities > showWidget){
  //     setDisplayWidget(showWidget);
  //     setPageArr(Array.from(Array(showWidget), (e, i) => i+1))
  //     setLastDots(true);
  //   } else {
  //     setDisplayWidget(pageQuantities);
  //     setPageArr(Array.from(Array(pageQuantities), (e, i) => i+1))
  //   }
  // }, [totalItems]);

  const clickHandler = async (event) => {
    const currentSelectPage = parseInt(event.target.getAttribute('value'));
    if(currentSelectPage > 0 && currentSelectPage < totalPages+1){
      setCurrentPage(currentSelectPage);
    }

    if(totalPages > displayWidget){
      if(currentSelectPage > displayWidget/2 && totalPages-currentSelectPage+1 >= displayWidget){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+currentSelectPage));
        pgArr = Array.from(Array(displayWidget), (e, i) => i+(currentSelectPage-1));
        setPageArr(pgArr);
        setFirstDots(true);setLastDots(true);
      } else if (totalPages-currentSelectPage <= displayWidget){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+(totalPages-displayWidget+1)));
        pgArr = Array.from(Array(displayWidget), (e, i) => i+(totalPages-displayWidget+1));
        setPageArr(pgArr);
        setFirstDots(true);setLastDots(false);
      } else if(currentSelectPage <= displayWidget/2){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+1));
        pgArr = Array.from(Array(displayWidget), (e, i) => i+1);
        setPageArr(pgArr);
        setFirstDots(false);setLastDots(true);
      }
    } else {
      setFirstDots(false);setLastDots(false);
    }
  }

  return (
    (totalPages > 1) && (
      <div className="flex w-full items-center justify-center mt-5">
        <Link to="#" value='1' 
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 rounded-l border border-gray-500 ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'<< First'}
        </Link>
        <Link to="#" value={(currentPage === 1) ? 1 : currentPage-1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 border-y border-r border-gray-500 ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'< Prev'}
        </Link>
        {
          (firstDots) && (
            <button className='px-4 py-2 border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        {
          pageArr.map((count, index) => 
            <Link to="#" value={count}
              onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
              key={index} className={`px-4 py-2 border-y border-r ${currentPage === count ? 'border-amber-700 bg-amber-700 text-white' : 'border-gray-500'} hover:bg-blue-500 hover:text-white`} >
              {count}
            </Link>
          )
        }
        {
          lastDots && (
            <button className='px-4 py-2 border-y border-r border-gray-500 hover:bg-blue-500 hover:text-white'>...</button>
          )
        }
        <Link to="#" value={(currentPage === totalPages) ? totalPages : currentPage+1}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 border-y border-r border-gray-500 ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'Next >'}
        </Link>
        <Link to="#" value={totalPages}
          onClick={(e) => { clickHandler(e); pageChangeHandler(e);} } 
          className={`px-3 py-2 rounded-r border-y border-r border-gray-500 ${currentPage === totalPages ? 'text-gray-400' : 'hover:bg-blue-500 hover:text-white'}`}
        >
          {'Last >>'}
        </Link>
      </div>
    )
  );
};

export default Pagination;