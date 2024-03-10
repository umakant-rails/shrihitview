import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../../actions/admin/admin_dashboards';
//https://demos.creative-tim.com/soft-ui-flowbite-pro/?_ga=2.87194584.1539948244.1710005126-243909173.1706023041
const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    total_articles,
    total_authors,
    total_tags,
    total_contexts,
    articles_by_count,
    articles_by_type,
    artcles_by_context,
    contexts_by_approval,
  } = useSelector( state => state.adminDashboard)

  useEffect( () => {
    dispatch(getDashboardData());
  }, []);
  
  return (
    <div>
      <div className="px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
          <div className="bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400 ">
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg class="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m14-4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-500">
                  {total_articles || ''}
                </span>
                <h3 className="text-base font-normal text-gray-800">Articles</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                +16%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400">
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg class="w-[30px] h-[30px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-500">
                {total_authors || ''}
                </span>
                <h3 className="text-base font-normal text-gray-800">Authors</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400">
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg class="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-500">
                {total_tags || ''}
                </span>
                <h3 className="text-base font-normal text-gray-800">Tags</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400 ">
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg class="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.2v.8l7 4 7-4v-.8m-14 5v.8l7 4 7-4v-1M12 3 5 7l7 4 7-4-7-4Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-500">
                  {total_contexts || ''}
                </span>
                <h3 className="text-base font-normal text-gray-800">Contexts/Collections</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;