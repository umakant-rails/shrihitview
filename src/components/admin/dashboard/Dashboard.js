import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../../actions/admin/admin_dashboards';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
//https://demos.creative-tim.com/soft-ui-flowbite-pro/?_ga=2.87194584.1539948244.1710005126-243909173.1706023041

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    total_articles,
    total_authors,
    total_tags,
    total_contexts,
    articles_by_time,
    articles_by_type,
    articles_by_context,
    contexts_by_approval,
  } = useSelector( state => state.adminDashboard);

  const [pieChartData, setPieChartData] = useState({});
  const [typeChartData, setTypeChartData] = useState({});
  const [columnChartData, setColumnChartData] = useState({});
  const [chartVisible, setChartVisible] = useState(false);
  
  useEffect( () => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    if(articles_by_time){
      let keys1 = Object.keys(articles_by_time);
      let values1 = Object.values(articles_by_time);

      setColumnChartData(columnChartData => ({...columnChartData,
        options: {
          chart: { id: 'apexchart-example'},
          xaxis: {categories: keys1, labels: {style: {colors: 'white'}}},
          yaxis: {labels: {style: {colors: 'white'}}},
        },
        series: [{ name: 'series-1', data: values1, color: "#FF69B4"}]
      }));

      let keys2 = Object.keys(articles_by_context);
      let values2 = Object.values(articles_by_context);

      setTypeChartData(typeChartData => ({...typeChartData,
        options: {
          chart: { id: 'apexchart-article-type'},
          xaxis: {categories: keys2, labels: {style: {colors: 'white'}}},
          yaxis: {labels: {style: {colors: 'white'}}},
        },
        series: [{ name: 'series-1', data: values2, color: "#FF69B4"}]
      }));

      let keys3 = Object.keys(articles_by_type);
      let values3 = Object.values(articles_by_type);
      setPieChartData(pieChartData => ({...pieChartData,
        series: values3,
        options: {
          chart: { width: 380, type: 'pie', foreColor: 'white' },
          labels: keys3,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {width: 200},
              legend: {position: 'bottom'}
            }
          }]
        },
      }));

      setChartVisible(true);
    }
  }, [articles_by_time])

  const currentMonthContribution = () => {
    if(articles_by_time) {
      let values = Object.values(articles_by_time);
      return ((values[values.length-1]/ total_articles) * 100.0).toFixed(2) + '%'
    } else {
      return '0%'
    }
  }
  return (
    <div>
      <div className="px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400
            bg-gradient-to-br from-stone-400 to-stone-600`}>
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md shadow-gray-300`}>
                <svg className="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4c0 .6-.4 1-1 1H5m14-4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-700">
                  {total_articles || ''}
                </span>
                <h3 className="text-base font-normal text-gray-900">Articles</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-400">
                +16%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400
            bg-gradient-to-br from-stone-400 to-stone-600`}>
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md shadow-gray-300`}>
                <svg className="w-[30px] h-[30px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-700">
                {total_authors || ''}
                </span>
                <h3 className="text-base font-normal text-gray-900">Authors</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-400">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400
            bg-gradient-to-br from-stone-400 to-stone-600`}>
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg className="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.6 8.4h0m-4.7 11.3-6.6-6.6a1 1 0 0 1 0-1.4l7.3-7.4a1 1 0 0 1 .7-.3H18a2 2 0 0 1 2 2v5.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.3 0Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-700">
                {total_tags || ''}
                </span>
                <h3 className="text-base font-normal text-gray-900">Tags</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-400">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-xl p-4 border border-blue-400
            bg-gradient-to-br from-stone-400 to-stone-600`}>
            <div className="flex items-center">
              <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 
                text-white bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-md 
                shadow-gray-300`}>
                <svg className="w-[26px] h-[26px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.2v.8l7 4 7-4v-.8m-14 5v.8l7 4 7-4v-1M12 3 5 7l7 4 7-4-7-4Z"/>
                </svg>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className="text-2xl font-bold leading-none text-gray-700">
                  {total_contexts || ''}
                </span>
                <h3 className="text-base font-normal text-gray-900">Contexts/Collections</h3>
              </div>
              <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-400">
                +3%
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-6 w-full">
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 
            bg-gradient-to-r from-slate-600 to-slate-900 2xl:col-span-2`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-white sm:text-3xl">
                  {total_articles}
                </span>
                <h3 className="text-base font-normal text-white">Contributed Articles</h3>
              </div>
              <div className="items-center text-base font-bold text-green-500">
                <div className='flex flex-1 justify-end'>
                  {currentMonthContribution()}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-base font-normal text-white">Contribution of this month.</h3>
              </div>
            </div>
            <div id="main-chart" style={{minHeight: '435px'}}>
              <div id="article_by_time" 
                className="apexcharts-canvas apexcharts-theme-light" 
                style={{height: '420px', color: 'white'}}>
                  {
                    chartVisible ? (<Chart 
                      options={columnChartData.options} 
                      series={columnChartData.series} 
                      type="bar" height={420} 
                    />) : null
                  }
              </div>
            </div>
            <div className="flex grid md:grid-cols-8 items-center pt-3 mt-5 border-t border-white sm:pt-6">
              <div className=''>
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-2xl hover:text-white" type="button" data-dropdown-toggle="weekly-sales-dropdown">
                  Last 7 days 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200" id="weekly-sales-dropdown" data-popper-placement="top" data-popper-reference-hidden data-popper-escaped style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(344px, 155px)'}}>
                  <div className="py-3 px-4" role="none">
                    <p className="text-sm font-medium text-gray-900 truncate" role="none">
                      Sep 16, 2021 - Sep 22, 2021
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Yesterday</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Today</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 7 days</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 30 days</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 90 days</Link>
                    </li>
                  </ul>
                  <div className="py-1" role="none">
                    <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Custom...</Link>
                  </div>
                </div>
              </div>
              <div className='text-white text-2xl text-center col-span-6 text-yellow-300 font-bold'>
                Articles Report : By Creation Time
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-3">
          <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 
            bg-gradient-to-r from-slate-600 to-slate-900 2xl:col-span-2`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-white sm:text-3xl">
                  {articles_by_context && Object.keys(articles_by_context).length}
                </span>
                <h3 className="text-base font-normal text-white">Available Contexts</h3>
              </div>
            </div>
            <div id="main-chart" style={{minHeight: '435px'}}>
              <div id="article_by_time" 
                className="apexcharts-canvas apexcharts-theme-light" 
                style={{height: '420px', color: 'white'}}>
                  {
                    chartVisible ? (<Chart 
                      options={typeChartData.options} 
                      series={typeChartData.series} 
                      type="bar" height={420} 
                    />) : null
                  }
              </div>
            </div>
            <div className="flex grid md:grid-cols-8 items-center pt-3 mt-5 border-t border-white sm:pt-6">
              <div className=''>
                <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-2xl hover:text-white" type="button" data-dropdown-toggle="weekly-sales-dropdown">
                  Last 7 days 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200" id="weekly-sales-dropdown" data-popper-placement="top" data-popper-reference-hidden data-popper-escaped style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(344px, 155px)'}}>
                  <div className="py-3 px-4" role="none">
                    <p className="text-sm font-medium text-gray-900 truncate" role="none">
                      Sep 16, 2021 - Sep 22, 2021
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Yesterday</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Today</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 7 days</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 30 days</Link>
                    </li>
                    <li>
                      <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last 90 days</Link>
                    </li>
                  </ul>
                  <div className="py-1" role="none">
                    <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Custom...</Link>
                  </div>
                </div>
              </div>
              <div className='text-white text-2xl text-center col-span-6 text-yellow-300 font-bold'>
                Articles Report : By Context Type
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 bg-gradient-to-r from-slate-600 to-slate-900 ">
            <div className="flex justify-between items-center mb-4 border-b border-white pb-5">
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  { articles_by_type && Object.values(articles_by_type).length }
                </h3>
                <span className="text-base font-normal text-white">
                  Available Aritcle Types
                </span>
              </div>
              <div className="flex-shrink-0">
                <Link to="#" className="p-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100">View all</Link>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-2xl">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
                    <div id="article_by_time" 
                      className="apexcharts-canvas apexcharts-theme-light" 
                      style={{height: '420px'}}>
                        {
                          chartVisible ? (<Chart 
                            options={pieChartData.options} 
                            series={pieChartData.series} 
                            type="pie"  height={420} 
                          />) : null
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex grids justify-center items-center pt-3 border-t sm:pt-6">
              <div className='text-white text-2xl text-center text-yellow-300 font-bold'>
                Articles Report : By Type
              </div>
            </div>
          </div>
        </div>

        {/* <div className='grid grid-cols-3 gap-6 w-full'>
          <div className=''>
            <div class="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 ">
              <div class="flex justify-between items-center mb-4">
                <h3 class="mb-2 text-xl font-bold text-gray-900">Sales by Country</h3>
              </div>
              <div class="flex flex-col">
                <div class="overflow-x-auto rounded-2xl">
                  <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Article Type
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Quntity
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          {
                            articles_by_type && Object.keys(articles_by_type).map( key => (
                              <tr>
                                <td class="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
                                  {key}
                                </td>
                                <td class="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                  {articles_by_type[key]}
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Dashboard;