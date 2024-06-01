import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_PER_PAGE } from '../../../utils/types';
import Pagination from '../../shared/Pagination';
import { deleteStory, getStories } from '../../../slices/user/userStorySlice';

const StoryList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [storyList, setStoryList] = useState([]);
  const [totalStoriesQnty, setTotalStoriesQnty] = useState(0);
  const { stories, total_stories, current_page } = useSelector( state => state.userStory );
  const [searchAttr, setSearchAttr] = useState({page: 1});

  useEffect( () => { 
    dispatch(getStories(searchAttr));
  }, [dispatch, searchAttr]);

  useEffect( () => {
    if(stories){
      setStoryList(stories);
      setTotalStoriesQnty(total_stories);
      setCurrentPage(current_page);
    }
  }, [stories, total_stories, current_page]);
  
  const handlePageClick = (event) => {
    const page = parseInt(event.target.getAttribute('value'));
    let sAttrs = {...searchAttr, page: page};
    setSearchAttr(sAttrs);
    dispatch(getStories(sAttrs));
  };

  const deleteToStory = (id) => {
    dispatch(deleteStory({id: id, origin_page:"index"}));
  }

  return (
    <div className='grid md:grid-cols-12'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-center text-blue-800 border rounded-md border-y-blue-700 shadow-xl mb-5 font-bold'>
          संत चरित्र/प्रेरक प्रसंग सूची
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
            </div>
            <div className="overflow-x-auto min-h-72 px-3">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                    <th scope="col" className="px-2 py-3">क्रमांक</th>
                    <th scope="col" className="px-2 py-3">शीर्षक</th>
                    <th scope="col" className="px-2 py-3">संत का नाम</th>
                    <th scope="col" className="px-2 py-3 text-center">गतिविधि</th>
                  </tr>
                </thead>
                {
                  storyList.length > 0 ? storyList.map( (story, index) => 
                    <tbody key={index} className='text-xl'>
                      <tr  
                        className="border-b dark:border-gray-700 text-blue-500 cursor-pointer" >
                        <td className='px-2 py-3'>{(currentPage-1)*10 + (index+1)}</td>
                        <td
                          className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <Link to={`/stories/${story.id}`} className="text-blue-500">  
                            {story.title}
                          </Link>
                        </td>
                        <td className="px-2 py-3">
                          {story.author}
                        </td>
                        <td className="px-2 py-3 flex items-center justify-center">
                          <Link to={`/stories/${story.id}`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                          </Link>
                          <Link to={`/stories/${story.id}/edit`}>
                            <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </Link>
                          <Link to="#" onClick={e => deleteToStory(story.id)}>
                            <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </Link>
                        </td>
                      </tr>
                      {/* {authorId === author.id ? (
                        <tr key={`detail-${index}`}>
                          <td colSpan={4} 
                            className="p-5 border-b border-gray-200 dark:border-gray-700">
                              <div className='max-h-96 overflow-y-scroll'>
                                {author.articles && author.articles.map((article, index)=>
                                  <p key={index} >
                                    <Link to={`/pb/articles/${article.hindi_title}`} className='cursor-pointer' >
                                      {index+1}. <span className='text-blue-500'>
                                        {article.hindi_title}
                                      </span>
                                    </Link> 
                                  </p>
                                )}
                              </div>
                          </td>
                        </tr>
                      ) : null} */}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="4" className='text-center py-5'>
                          There is no Authors available.
                        </td>
                      </tr>
                    </tbody>
                  )
                }
              </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              {
                totalStoriesQnty ? (
                  <Pagination 
                    showWidget={5} 
                    totalItems={totalStoriesQnty}
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

export default StoryList;