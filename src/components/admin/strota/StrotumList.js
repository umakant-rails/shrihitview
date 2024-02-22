import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from 'primereact/editor';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { deleteStrotum, getStrota } from '../../../actions/admin/admin_strota';
import { Modal } from 'flowbite';

const strotumArticleObj = {index: '', content: '', interpretation: '', article_type_id: ''};

const StrotumList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [strotumList, setStrotumList] = useState([]);
  const[strotaType, setStrotaType] = useState('');
  const [totalStrotumQnty, setTotalStrotumQnty] = useState(0);
  const { strota, total_strota, current_page, strota_types } = useSelector( state => state.adminStrotum );
  const [searchAttr, setSearchAttr] = useState({page: 1});
  const [formValues, setFormValues] = useState(strotumArticleObj);
  const popup = useRef(null);

  useEffect( () => { 
    dispatch(getStrota(searchAttr));
  }, []);

  useEffect( () => {
    if(strota){
      setStrotumList(strota);
      setTotalStrotumQnty(total_strota);
      setCurrentPage(current_page);
    }
  }, [strota, total_strota, current_page]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttr, page: page};
    setSearchAttr(sAttrs);
    dispatch(getStrota(sAttrs));
  };

  const resetFilteredAuthors = (e) => {
    setTotalStrotumQnty(null);
    setSearchAttr({page: 1})
    dispatch(getStrota({page: 1}));
    setStrotaType('')
  }
  const getStrotaType = (e) => {
    const selectedStrotaType = e.target.value;
    setStrotaType(selectedStrotaType);
    let sAttrs = {'strota_type_id': selectedStrotaType, page: 0};
    setSearchAttr(sAttrs);
    dispatch(getStrota(sAttrs));
  }

  const deleteToStrotum = (id) => {
    dispatch(deleteStrotum(id));
  }

  const setEditorValues = (name, value) => {
    setFormValues(formValues => ({ ...formValues, [name]: value }));
  }

  const showPopup = () => {
    const modalEl = document.getElementById('new-st-article-modal');
    const privacyModal = new Modal(modalEl, { placement: 'center' });
    popup.current = privacyModal;
    privacyModal.show();
  }
  const hidePopup = () => { popup.current.hide(); popup.current = null; }

  const popupFunc = () => {
    return (
      <div id="new-st-article-modal" tabIndex="-1" aria-hidden="true" 
        className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-2 w-full max-w-7xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:p-3 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                स्त्रोत/आरती रचना फॉर्म
              </h3>
              <button type="button" 
                onClick={hidePopup}
                className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center 
                  dark:hover:bg-gray-600 dark:hover:text-white`}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="py-3 px-10">
              <div className="pb-4 md:pb-4 space-y-4">
                <div className='grid md:grid-cols-12 mb-3 gap-6'>
                  <div className='col-span-6'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      रचना प्रकार <span title="required" className="text-red-600 font-bold">*</span>
                    </label>
                    <input type="text" 
                      onChange={e => setEditorValues('article_type_id', e.target.value)}
                      className={`block w-full p-2.5 text-gray-900 border border-gray-300 
                      rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      value={formValues.article_type_id || ''} required/>
                  </div>
                  <div className='col-span-6'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      रचना अनुक्रम
                    </label>
                    <input type="number" 
                      onChange={e => setEditorValues('index', e.target.value)}
                      className={`block w-full p-2.5 text-gray-900 border border-gray-300 
                      rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      value={formValues.index || ''} />
                  </div>
                </div>
                <div className='mb-3'>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    रचना <span title="required" className="text-red-600 font-bold">*</span>
                  </label>
                  <Editor  name="content" 
                    value={formValues.content || ''}
                    onTextChange={ e => { 
                      setEditorValues('content', e.htmlValue); 
                    }}
                    style={{ height: '180px', fontSize: '16px'}} />
                </div>
                <div className='mb-3'>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                    रचना का अर्थ
                  </label>
                  <Editor value={formValues.interpretation || ''} 
                    name="interpretation" 
                    onTextChange={(e) => {
                      setEditorValues('interpretation', e.htmlValue);
                    }} 
                    style={{ height: '180px', fontSize: '16px'}} />
                </div>
              </div>
              <div className="flex items-center p-3 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="button"
                  onClick={hidePopup} 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  स्त्रोत/आरती जोड़े
                </button> 
                <button 
                  onClick={hidePopup} 
                  className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none 
                    bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                    focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                    dark:hover:bg-gray-700`}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          स्त्रोत/आरती सूची
        </div>
        <section className="bg-gray-50 dark:bg-gray-900 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    onClick={resetFilteredAuthors}
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                  <select id="strota_type_id" name="strota_type_id" 
                    value={strotaType}
                    onChange = {getStrotaType}
                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                      rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                      dark:shadow-sm-light`}>
                      <option value="">स्त्रोत/आरती का प्रकार चुने</option>
                      {
                        strota_types && strota_types.map( (strota_type, index) => 
                          <option key={index} value={strota_type.id}>{strota_type.name}</option>
                        )
                      }
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72 px-4">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
                    <th scope="col" className="px-2 py-3">रचनायें</th>
                    <th scope="col" className="px-2 py-3">Add Articles</th>
                    <th scope="col" className="px-2 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    strotumList.length > 0 ? strotumList.map( (strotum, index) => 
                      <tr key={index}
                        className="border-b dark:border-gray-700" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link to={`/admin/strota/${strotum.id}`} className="text-blue-500 cursor-pointer">
                              {strotum.title}
                            </Link>
                        </td>
                        <td className="px-2 py-3">
                          {strotum.strota_type}
                        </td>
                        <td className="px-2 py-3">
                          <button 
                            onClick={showPopup}
                            className='flex bg-blue-600 rounded p-2 text-sm text-white'>
                            Add Articles&nbsp;&nbsp;
                            <svg className="w-[18px] h-[18px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h4M9 3v4c0 .6-.4 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
                            </svg>
                          </button>
                        </td>
                        <td className="px-2 py-3 flex items-center  justify-center">
                          <Link to={`/admin/strota/${strotum.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteToStrotum(strotum.id)}>
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
                totalStrotumQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalStrotumQnty}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              }
            </nav>
          </div>
        </section>
      </div>
      {popupFunc()}
    </div>
  );
};

export default StrotumList;