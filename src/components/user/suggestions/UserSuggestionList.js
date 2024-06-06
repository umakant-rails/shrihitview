import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { confirmBeforeDeletion } from '../../../utils/utilityFunctions';
import { 
  deleteUserSuggestion, 
  getUserSuggestions 
} from '../../../slices/user/userSuggestionSlice';

const UserSuggestionList = () => {
  const dispatch = useDispatch();

  const [suggestionList, setSuggestionList] = useState(null);
  const [totalSuggestions, setTotalSuggestions] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const { suggestions, total_suggestions, isDeleted } = useSelector( state => state.userSuggestion );
  
  useEffect( () => {
    dispatch(getUserSuggestions(currentPage));
  }, [dispatch, currentPage]);

  useEffect( () => {
    if(suggestions){
      setSuggestionList(suggestions);
      setTotalSuggestions(total_suggestions);
    }
  }, [suggestions, total_suggestions, isDeleted]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    setCurrentPage(page);
    dispatch(getUserSuggestions(page));
  };

  const deleteToSuggestion = (id) => {
    if(confirmBeforeDeletion()){
      dispatch(deleteUserSuggestion(id));
    }
  }

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
                  <Link to="/users/suggestions/new"
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
                          <Link to={`/users/suggestions/${suggestion.id}`}>{suggestion.title}</Link>
                        </td>
                        <td className="px-2 py-3 flex items-center justify-end">
                          <Link to={`/users/suggestions/${suggestion.id}`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                          </Link>
                          <Link to={`/users/suggestions/${suggestion.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteToSuggestion(suggestion.id)} >
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
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

export default UserSuggestionList;