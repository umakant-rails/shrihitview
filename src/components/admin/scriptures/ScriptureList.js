import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { getScriptures, deleteScripture } from '../../../actions/admin/admin_scriptures';

const ScriptureList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [scriptureList, setScriptureList] = useState([]);
  const [scriptureType, setScriptureType] = useState('');
  const [totalScripturesQnty, setTotalScripturesQnty] = useState(0);
  const {scriptures, total_scriptures, current_page, scripture_types } = useSelector( state => state.adminScripture );
  const [searchAttrs, setSearchAttrs] = useState({page: 1});

  useEffect( () => { 
    dispatch(getScriptures(searchAttrs));
  }, [dispatch, searchAttrs]);

  useEffect( () => {
    if(scriptures){
      setScriptureList(scriptures);
      setTotalScripturesQnty(total_scriptures);
      setCurrentPage(current_page);
    }
  }, [scriptures, total_scriptures, current_page]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttrs, page: page};
    setSearchAttrs(sAttrs);
    dispatch(getScriptures(sAttrs));
  };

  const resetFilteredAuthors = (e) => {
    setTotalScripturesQnty(null);
    setSearchAttrs({page: 1})
    dispatch(getScriptures({page: 1}));
    setScriptureType('');
  }
  const getScriptureType = (e) => {
    const selectedScriptureType = e.target.value;
    setScriptureType(selectedScriptureType);
    let sAttrs = {'scripture_type_id': selectedScriptureType, page: 0};
    setSearchAttrs(sAttrs);
    dispatch(getScriptures(sAttrs));
  }

  const deleteToScripture = (id) => {
    dispatch(deleteScripture(id));
  }

  const getAddArticleUrl = (scripture) => {
    if(scripture.scripture_type_id === 5 || scripture.scripture_type_id === 6){
      return `/admin/compiled_scriptures/${scripture.id}/add_article_page`;
    } if (scripture.scripture_type_id === 4) {
      return "#";
    }else {
      return `/admin/scriptures/${scripture.id}/articles/new`;
    }
  }
  const getShowPageUrl = (scripture) => {
    if(scripture.scripture_type_id === 5 || scripture.scripture_type_id === 6){
      return `/admin/compiled_scriptures/${scripture.id}`;
    } if (scripture.scripture_type_id === 4) {
      return "#";
    }else {
      return `/admin/scriptures/${scripture.id}`
    }
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          रसिक वाणी/ग्रन्थ सूची
        </div>
        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 p-4">
              <div className="w-full md:w-1/2"></div>
              <div className="md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Link to="/admin/scriptures/new" 
                    className='rounded bg-blue-600 text-white py-2 px-3 w-auto'>
                    रसिक वाणी/ग्रन्थ जोड़े
                  </Link>
                  <button
                    onClick={resetFilteredAuthors}
                    className={`w-auto md:w-auto flex items-center justify-center py-2.5 px-4 
                      text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border 
                      border-gray-400 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                      focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                      dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                      dark:hover:bg-gray-700`} type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                  <select id="scripture_type_id" name="scripture_type_id" 
                    value={scriptureType}
                    onChange = {getScriptureType}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                      rounded focus:ring-blue-500 focus:border-blue-500 block p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                      dark:shadow-sm-light w-auto`}>
                      <option value="">स्त्रोत/आरती का प्रकार चुने</option>
                      {
                        scripture_types && scripture_types.map( (strota_type, index) => 
                          <option key={index} value={strota_type.id}>{strota_type.name}</option>
                        )
                      }
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रसिक वाणी/ग्रन्थ</th>
                    <th scope="col" className="px-2 py-3">रसिक वाणी/ग्रन्थ प्रकार</th>
                    <th scope="col" className="px-2 py-3">लेखक</th>
                    <th scope="col" className="px-2 py-3">Activities</th>
                    <th scope="col" className="px-2 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    scriptureList.length > 0 ? scriptureList.map( (scripture, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link to={getShowPageUrl(scripture)} className="text-blue-500 cursor-pointer">
                              {scripture.name}
                            </Link>
                        </td>
                        <td className="px-2 py-3">
                          {scripture.scripture_type}
                        </td>
                        <td className="px-2 py-3">
                          {scripture.author}
                        </td>
                        <td className="px-2 py-3">
                          <Link to={`/admin/scriptures/${scripture.id}/chapters`} 
                            className={`inline-flex text-sm bg-blue-600 text-white rounded font-bold 
                            px-3 py-2 mr-2 hover:bg-blue-700`}>
                            Add Chapters&nbsp;&nbsp;
                            <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                          </Link>
                          <Link to={getAddArticleUrl(scripture)} className={`inline-flex text-sm bg-blue-600 text-white rounded font-bold 
                            px-3 py-2 mr-2 hover:bg-blue-700`}>
                            Add Articles&nbsp;&nbsp;
                            <svg className="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                          </Link>
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <Link to={`/admin/scriptures/${scripture.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteToScripture(scripture.id)}>
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
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalScripturesQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalScripturesQnty}
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

export default ScriptureList;