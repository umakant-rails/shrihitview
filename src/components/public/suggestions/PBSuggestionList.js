import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { getSuggestions } from '../../../slices/public/suggestionSlice';

const PBSuggestionList = () => {
  const dispatch = useDispatch();

  const [suggestionList, setSuggestionList] = useState(null);
  const [totalSuggestions, setTotalSuggestions] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const { suggestions, total_suggestions } = useSelector( state => state.suggestion );
  
  useEffect( () => {
    dispatch(getSuggestions(currentPage));
  }, [dispatch, currentPage]);

  useEffect( () => {
    if(suggestions){
      setSuggestionList(suggestions);
      setTotalSuggestions(total_suggestions);
    }
  }, [suggestions, total_suggestions]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    setCurrentPage(page);
    dispatch(getSuggestions(page));
  };

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          सुझाव सूची 
        </div>
        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Link to="/pb/suggestions/new"
                    className={`w-full md:w-auto flex items-center justify-center py-2 px-4 text-base 
                      font-medium text-white focus:outline-none bg-indigo-600 rounded-lg border border-gray-200 
                      hover:bg-indigo-700 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
                      dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                      dark:hover:text-white dark:hover:bg-gray-700`} type="button">
                    <svg className="w-[22px] h-[22px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>&nbsp;&nbsp;नया सुझाव
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                    <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">सुझाव</th>
                    <th scope="col" className="px-2 py-3">&nbsp;</th>
                  </tr>
                </thead>
                {
                  suggestionList ? suggestionList.map( (suggestion, index) => 
                    <tbody key={index} className='text-xl'>
                      <tr  
                        className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                        <th scope="row" 
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index+1}
                        </th>
                        <td className="px-2 py-3">
                          <Link to={`/pb/suggestions/${suggestion.id}`}>{suggestion.title}</Link>
                        </td>
                        <td className="px-2 py-3 flex items-center justify-end">
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="3" className='text-center py-5'>
                          There is no suggestion availables.
                        </td>
                      </tr>
                    </tbody>
                  )
                }
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalSuggestions &&
                <Pagination 
                  showWidget={5} 
                  totalItems={totalSuggestions}
                  itemsPerPage={ITEM_PER_PAGE}
                  pageChangeHandler= {handlePageClick}
                />
              }
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PBSuggestionList;