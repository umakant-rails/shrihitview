import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/images/hitlalju.png"
import { USER_ACTIVITIES } from '../../utils/types';
import { DEFAULT_ICON } from '../../utils/types';

const ContributorSideBar = () => {
  const [expandTab, setExpandTab] = useState('');
  const [activeTab, setActiveTab] = useState('रचना');
  
  const updateExpandTab = (tabName) => (tabName !== expandTab) ? setExpandTab(tabName) : setExpandTab('')
 
  const getExpandIcon = (activeTab) => {
    if(expandTab === activeTab){
      return (<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
      </svg>)
    } else {
      return (<svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
      </svg>)
    }
  }

  return (
    <>
      <aside id="default-sidebar" 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full 
          sm:translate-x-0`} aria-label="Sidenav">
        <div className='h-16 bg-blue-900 border-b border-r border-gray-600'>
          <NavLink to="/admin/dashboard" className="px-5 pt-2 flex justify-center items-center">
            <img className="h-11 w-11 w-auto rounded-full mr-4" src={logo}  alt="श्रीहित" />
            <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
              श्रीहित
            </span>
          </NavLink>
        </div>
        <div className="overflow-y-auto h-full bg-gray-800 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul>
            {
              USER_ACTIVITIES.map( (activity, index) => 
                (activity.childs.length == 0) ? (
                  <li key={index} className='border-b border-gray-700' 
                    onClick={e => updateExpandTab(`dropdown-${activity.label}`)}>
                    <Link to={activity.url} onClick={e => setActiveTab(activity.label)}
                      className={`flex items-center p-3 text-base font-normal 
                      text-gray-400 dark:text-white hover:text-violet-400 
                      dark:hover:bg-gray-600 group ${activeTab === activity.label && 'bg-gradient-to-r from-blue-800 to-gray-800 to-gray-800'}`}>
                      {<svg className='h-6 w-6' dangerouslySetInnerHTML={{__html: activity.icon ? activity.icon : DEFAULT_ICON}} />}
                      <span className="ml-3">{activity.label}</span>
                    </Link>
                  </li> 
                ) : (
                  <li key={index} className='border-b border-gray-700'>
                    <button type="button" aria-controls={`dropdown-${activity.label}`} 
                      data-collapse-toggle={`dropdown-${activity.label}`}
                      onClick={e => updateExpandTab(`dropdown-${activity.label}`)}
                      className="flex items-center p-3 w-full text-base font-normal text-gray-400 rounded-lg transition duration-75 group hover:text-violet-400 dark:text-white dark:hover:bg-gray-600" >
                      {<svg className='h-6 w-6' dangerouslySetInnerHTML={{__html: activity.icon ? activity.icon : DEFAULT_ICON}} />}
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">{activity.label}</span>
                      {getExpandIcon(`dropdown-${activity.label}`)}
                    </button>
                    <ul id={`dropdown-${activity.label}`} className={expandTab !== `dropdown-${activity.label}` ? 'hidden' : ''}>
                      {
                        activity.childs && activity.childs.map( (child, index) => 
                          <li key={index} className='border-t border-gray-900'>
                            <Link to={child.url} onClick={e => setActiveTab(`${activity.label}-${child.label}`)}
                              className={`flex items-center p-2 pl-8 w-full text-base 
                              font-normal text-gray-400 transition duration-75 group bg-gray-700 
                              hover:text-violet-400 dark:text-white dark:hover:bg-gray-600
                              ${activeTab === `${activity.label}-${child.label}` && 'bg-gradient-to-r from-blue-800 to-gray-800 to-gray-800'}`}>
                              {child.label}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </li>
                )
              )
            }
          </ul>
        </div>
        {/* <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-gray-800 dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
          <a href="#" className="inline-flex justify-center p-2 text-white rounded cursor-pointer dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gray-600 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
          </a>
          <a href="#" data-tooltip-target="tooltip-settings" className="inline-flex justify-center p-2 text-white rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-white hover:bg-gray-600 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
            </svg>
          </a>
          <div id="tooltip-settings" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip">
            Settings page
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div> */}
      </aside>
    </>
  );
};

export default ContributorSideBar;