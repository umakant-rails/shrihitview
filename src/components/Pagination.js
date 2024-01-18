import React, {useEffect, useState } from 'react';

const Pagination = ({totalItems, itemsPerPage, pageChangeHandler, showWidget}) => {
  const [currentPage, setCurrentPage] = useState(1);
  //const [displayWidget, setDisplayWidget] = useState(showWidget);
  //const [pageArr, setPageArr] = useState([]);
  const [firstDots, setFirstDots] = useState(false);
  const [lastDots, setLastDots] = useState(false);
  //const [totalPages, setTotalPages] = useState(0);
  
  //const totalPages = Math.ceil(totalItems/itemsPerPage);
  

  let pageArr = [];
  let totalPages = Math.ceil(totalItems/itemsPerPage);
  let displayWidget = showWidget;
  if(totalPages > showWidget){
    pageArr = Array.from(Array(showWidget), (e, i) => i+1);
    //setPageArr(arr);
  } else { 
    pageArr = Array.from(Array(totalPages), (e, i) => i+1);
    //setPageArr(arr);
    displayWidget = totalPages;
  }

  useEffect( () => {
    setCurrentPage(1);setFirstDots(false); setLastDots(false);
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
      if(currentSelectPage > displayWidget/2 && totalPages-currentSelectPage >= displayWidget){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+currentSelectPage));
        pageArr = Array.from(Array(displayWidget), (e, i) => i+currentSelectPage)
        setFirstDots(true);setLastDots(true);
      } else if (totalPages-currentSelectPage+1 <= displayWidget){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+(totalPages-displayWidget+1)));
        pageArr = Array.from(Array(displayWidget), (e, i) => i+(totalPages-displayWidget+1))
        setFirstDots(true);setLastDots(false);
      } else if(currentSelectPage <= displayWidget/2){
        // setPageArr(Array.from(Array(displayWidget), (e, i) => i+1));
        pageArr = Array.from(Array(displayWidget), (e, i) => i+1)
        setFirstDots(false);setLastDots(true);
      }
    } else {
      setFirstDots(false);setLastDots(false);
    }
  }

  return (
    (totalPages > 1) && (
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
          lastDots && (
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