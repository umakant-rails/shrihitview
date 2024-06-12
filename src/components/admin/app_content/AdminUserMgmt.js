import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../../../slices/admin/adminUserMgmtSlice';
import Pagination from '../../shared/Pagination';
import { ITEM_PER_PAGE } from '../../../utils/types';
import { confirmBeforeDeletion } from '../../../utils/utilityFunctions';

const AdminUserMgmt = () => {
  const aphabetList = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(' ');
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchAttrs, setSearchAttrs] = useState({page: 1});
  const {users, total_users, current_page } = useSelector( state => state.adminUserMgmt);

  useEffect( () => {
    dispatch(getAllUsers(searchAttrs));
  }, [dispatch]);

  useEffect( () => {
    if(users){
      setUserList(users);
      setTotalUsers(total_users);
      setCurrentPage(current_page);
    }
  }, [users, total_users, current_page]);

  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttrs, page: page};
    setSearchAttrs(sAttrs);
    dispatch(getAllUsers(sAttrs));
  };

  const resetFilteredAuthors = (e) => {
    setTotalUsers(null);
    setSearchAttrs({page: 1})
    dispatch(getAllUsers({page: 1}));
    document.getElementsByName("alphabet").forEach((el) => el.checked = false );
  }

  const filterUser = (e) => {
    const selectedAlbhabet = e.target.value;
    let sAttrs = {'start_with': selectedAlbhabet, page: 0};
    setSearchAttrs(sAttrs);
    dispatch(getAllUsers(sAttrs));
  }
  const onSearchInputChange = (event) => {
    const { name, value } = event.target;
    const sAttrs = {...searchAttrs, [name]: value, page: 1};
    setSearchAttrs(sAttrs);
    dispatch(getAllUsers(sAttrs));
  }

  const deleteAUser = (id) => {
    if(confirmBeforeDeletion()){
      dispatch(deleteUser(id));
    }
  }
  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          उपयोगकर्ता सूची
        </div>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={resetFilteredAuthors}
                    className={`w-full md:w-auto flex items-center justify-betweeen py-2 px-4 
                      text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
                      border border-gray-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                      focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                      dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                      dark:hover:bg-gray-700`} type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" 
                    className={`w-full md:w-auto flex items-center justify-center py-2 px-4 
                      text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
                      border border-gray-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                      focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                      dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                      dark:hover:bg-gray-700`} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filter
                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  <div id="filterDropdown" 
                    className={`z-10 hidden w-96 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}>
                    <h6 className="mb-3 text-center text-sm font-medium text-gray-900 dark:text-white pb-2 border-b border-b-2">
                      Choose alphabet
                    </h6>
                    <div className="space-y-2 grid grid-cols-6 text-sm" aria-labelledby="filterDropdownButton">
                      {
                        aphabetList.map((albhabet, index)=>
                          <div key={index} className="">
                            <input id="albhabet" type="radio" name="alphabet" value={albhabet} 
                              onChange={filterUser}
                              className="w-4 h-4 me-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              {albhabet}
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <select id="order" name="order" 
                    value={searchAttrs.order ? searchAttrs.order : ''}
                    onChange={onSearchInputChange}
                    className={`w-full md:w-auto flex items-center justify-center py-2 px-4 
                    text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg 
                    border border-gray-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                    focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                    dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                    dark:hover:bg-gray-700`}>
                      <option value="">Sort By Username</option>
                      <option value="ASC">Ascending</option>
                      <option value="DESC">Descending</option>
                  </select>
                </div>
              </div>
              
            </div>
            <div className="overflow-x-auto min-h-72 px-3">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                    <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
                    <th scope="col" className="px-2 py-3">Status</th>
                    <th scope="col" className="px-2 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    userList.length > 0 ? userList.map( (user, index) => 
                     <tr key={index} 
                        className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td  
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.username}
                        </td>
                        <td className="px-2 py-3">
                          {user.email}
                        </td>
                        <td className="px-2 py-3 flex items-center justify-center">
                          <Link to="#" onClick={e => deleteAUser(user.id)}>
                            <svg className="w-6 h-6 text-red-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                          </Link>

                          <Link to="#" onClick={e => deleteAUser(user.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="4" className='text-center py-5'>
                          There is no Authors available.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <div className="text-gray-600 mt-2">
                View record {(currentPage-1)*10+1} to {totalUsers > currentPage*10 ? currentPage*10 : totalUsers} out of total records {totalUsers}.
              </div>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalUsers ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalUsers}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              }
            </nav>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminUserMgmt;