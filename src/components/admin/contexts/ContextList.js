import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/Pagination';
import { 
  deleteContext, 
  getContexts, 
  createContext, 
  updateContext 
} from '../../../slices/admin/adminContextSlice';
import { ReactTransliterate } from "react-transliterate";
import { Modal } from 'flowbite';
import { confirmBeforeDeletion } from '../../../utils/utilityFunctions';

const contextObj = {name: ''};
const ContextList = () => {
  const dispatch = useDispatch();
  const aphabetList = "अ इ उ ऋ ए क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(' ');
  const [currentPage, setCurrentPage] = useState(1);
  const [contextList, setContextList] = useState([]);
  const [totalContextQnty, setTotalContextQnty] = useState(0);

  const [formValues, setFormValues] = useState(contextObj);
  const [editableContext, setEditableContext] = useState(null);
  const [searchAttr, setSearchAttr] = useState({page: 1});
  const popup = useRef(null);

  const { context, contexts, total_contexts, current_page } = useSelector( state => state.adminContext );

  useEffect( () => { 
    dispatch(getContexts({page: 1}));
  }, [dispatch]);

  useEffect( () => {
    if(contexts){
      setContextList(contexts);
      setTotalContextQnty(total_contexts);
      setCurrentPage(current_page);
    }
  }, [contexts, total_contexts, current_page]);

  useEffect( () => {
    if(context && popup.current){
      popup.current.hide();
    }
  }, [context]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttr, page: page};
    setSearchAttr(sAttrs);
    dispatch(getContexts(sAttrs));
  };

  const resetFilteredAuthors = (e) => {
    setTotalContextQnty(null);
    setSearchAttr({page: 1})
    dispatch(getContexts({page: 1}));
    document.getElementsByName("alphabet").forEach((el) => el.checked = false );
  }

  const filterAuthors = (e) => {
    const selectedAlbhabet = e.target.value;
    let sAttrs = {'start_with': selectedAlbhabet, page: 0};
    setSearchAttr(sAttrs);
    dispatch(getContexts(sAttrs));
  }

  const deleteToTag = (id) => {
    if(confirmBeforeDeletion()){
      dispatch(deleteContext(id));
    }
  }

  const setTagForEditing = (id) => {
    if(id){
      const context = contexts.filter((context) => context.id === id)[0];
      setFormValues(formValues => ({...formValues, name: context.name}));
      setEditableContext(context);
    } else{
      setFormValues(contextObj);setEditableContext(null);
    }
  }

  const createNewContext = () => { dispatch(createContext(formValues));}
  const updateToContext = () => { dispatch(updateContext({id: editableContext.id, form: formValues})); }
  
  const showPopup = () => {
    const modalEl = document.getElementById('new-context-modal');
    const privacyModal = new Modal(modalEl, { placement: 'center' });
    popup.current = privacyModal;
    privacyModal.show();
  }
  const hidePopup = () => { popup.current.hide(); popup.current = null; }
  const popFunc = () => {
    return (
      <div id="new-context-modal" tabIndex="-1" aria-hidden="true" 
        className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 
        justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                { editableContext ? 'प्रसंग अद्यतन फॉर्म' : 'प्रसंग फॉर्म'}
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

            <div className="p-4 md:p-5 space-y-4">
              <form className="py-5 px-10">
                <div className='grid md:grid-cols-12 mb-3'>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      नाम (हिंदी) <span title="required" className="text-red-600 font-bold">*</span>
                    </label>
                  </div>
                  <div className='col-span-12'>
                    <ReactTransliterate
                      value={formValues.name || ''}
                      onChangeText={(text) => { setFormValues(formValues => ({...formValues, name: text})) }}
                      lang={'hi'}
                      type="text"
                      className={`block w-full p-2.5 text-gray-900 border border-gray-300 
                        rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    />
                  </div>
                </div>
                {/* <div className='grid md:grid-cols-12 mb-3'>
                  <div className='col-span-12'>
                    <label className="block mb-2 font-medium text-gray-900 dark:text-white">
                      नाम (अंग्रेजी) <span title="required" className="text-red-600 font-bold">*</span>
                    </label>
                  </div>
                  <div className='col-span-12'>
                    <input id="name_eng" name="name_eng" 
                      value={formValues.name_eng || ''}
                      onChange={(e) => { setFormValues(formValues => ({...formValues, name_eng: e.target.value})) }}
                      className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                        rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                        dark:shadow-sm-light`} />
                  </div>
                </div> */}
              </form>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              { 
                editableContext ? ( <button type="button"
                  onClick={updateToContext} 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  प्रसंग अद्यतन करें
                </button>) : ( <button type="button"
                  onClick={createNewContext} 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  प्रसंग जोड़े
                </button> ) 
              }
              <button 
                onClick={hidePopup} 
                className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none 
                  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
                  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                  dark:hover:bg-gray-700`}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          प्रसंग सूची 
        </div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4">
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
                  <button onClick={ e => { showPopup(); setTagForEditing();}} 
                    className={`flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800`} type="button">
                    Add New Context &nbsp;&nbsp;
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                  </button>
                  <button
                    onClick={resetFilteredAuthors}
                    className={`w-full md:w-auto flex items-center justify-center py-2.5 px-4 text-sm 
                      font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 
                      hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
                      dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                      dark:hover:text-white dark:hover:bg-gray-700`} type="button">
                    Refresh&nbsp;&nbsp;
                    <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                    </svg>
                  </button>
                  <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" 
                    className={`w-full md:w-auto flex items-center justify-center py-2.5 px-4 text-sm font-medium 
                      text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 
                      hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 
                      dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                      dark:hover:text-white dark:hover:bg-gray-700`} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filter
                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                  <div id="filterDropdown" className="z-10 hidden w-96 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                    <h6 className="mb-3 text-center text-sm font-medium text-gray-900 dark:text-white pb-2 border-b border-b-2">
                      Choose alphabet
                    </h6>
                    <div className="space-y-2 grid grid-cols-6 text-sm" aria-labelledby="filterDropdownButton">
                      {
                        aphabetList.map((albhabet, index)=>
                          <div key={index} className="">
                            <input id="albhabet" type="radio" name="alphabet" value={albhabet} 
                              onChange={filterAuthors}
                              className="w-4 h-4 me-2 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                              {albhabet}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto min-h-72 px-3">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">रचनाकार/लेखक</th>
                    <th scope="col" className="px-2 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className='text-xl'>
                  {
                    contextList.length > 0 ? contextList.map( (context, index) => 
                     <tr key={index} 
                        className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td 
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {context.name}
                        </td>
                        <td className="px-2 py-3 flex items-center justify-end">
                          <button onClick={e => {showPopup(); setTagForEditing(context.id);}} >
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </button>
                          <Link to="#" onClick={e => deleteToTag(context.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" className='text-center py-5'>
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
                totalContextQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalContextQnty}
                    itemsPerPage={ITEM_PER_PAGE}
                    pageChangeHandler= {handlePageClick}
                  />) : ''
              }
            </nav>
          </div>
        </section>
      </div>
      {popFunc()}
    </div>
    
  );
};

export default ContextList;