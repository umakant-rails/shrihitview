import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { initFlowbite } from 'flowbite';
import { dateFormat, tithiName } from '../../../utils/utilityFunctions';
import { navigateMonth } from '../../../actions/public/panchangs';
//https://tailwindcomponents.com/component/calendar-4

const PBPanchangShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(moment().clone());
  const [startDateOfMonth, setStartDateOfMonth] = useState();
  const [endDateOfMonth,setEndDateOfMonth] = useState();
  const [monthDateArr, setMonthDateArr] = useState([]);
	const [tithiList, setTithiList] = useState([]);
  const [tithisHash, setTithisHash] = useState({});
	const [tithisHash2, setTithisHash2] = useState({});

	const { panchang, tithis } = useSelector( state => state.panchang);

  useEffect( () => {initFlowbite();});
  useEffect( () => { currentMonth(); }, []);
	useEffect( () => { if(tithis) createTithisHash(tithis);setTithiList(tithis); }, [tithis]);
	
	const createTithisHash = (tithis) => {
    let tithiHs1 = {}, tithiHs2 = {};
    tithis.forEach((tithi) => {
      const dt = moment(tithi.date).format('DD/MM/YYYY');
      tithiHs1[dt] = (tithiHs1[dt] !== undefined) ? tithiHs1[dt]+","+tithiName(tithi, true) : tithiName(tithi);
		  if(tithi.description) {
        tithiHs2[dt] = `<div class='font-bold'>${tithi.title}</div> ${tithi.description}`;
      }
		});
    setTithisHash(tithiHs1);
		setTithisHash2(tithiHs2);
  }

	const createDateArr = (newDate) => {
		setStartDateOfMonth(newDate.clone().startOf('month'));
    setEndDateOfMonth(newDate.clone().endOf('month'));

    const firstDate = newDate.clone().startOf('month').startOf('week');
    const lastDate = newDate.clone().endOf('month').endOf('week')
    let arr = [];
    while(lastDate >= firstDate ){
      arr.push(firstDate.clone());
      firstDate.add(1, "days");
    }
		setMonthDateArr(arr);
		dispatch(navigateMonth(id, newDate));
	}
	const currentMonth = () => { setCurrentDate(moment().clone()); createDateArr(moment().clone()); }
	const nextMonth = () => { currentDate.add(1, "month"); createDateArr(currentDate); }
	const prevMonth = () => { currentDate.subtract(1, "month"); createDateArr(currentDate); }

	return (
		<>
			{tithisHash[dateFormat(moment().clone())] && <div className='grid md:grid-cols-12'>
					<div className={`col-start-2 col-span-10 border border-pink-300 rounded px-5 py-2 
						bg-pink-50 text-pink-600 text-2xl font-bold text-center`}>
						आज की तिथि - { tithisHash[dateFormat(moment().clone())] }
					</div>
				</div>
			}
			<div className='grid md:grid-cols-12 mt-5'>
				<div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-5 pt-5 pb-8'>
					<div className='bg-blue-50 px-2 py-2 text-center text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
						पंचांग - {panchang ? panchang.title : 'उपलब्ध नही'} {panchang && `(विक्रम सम्वत-${panchang.vikram_samvat})`}
					</div>
					<div className='grid md:grid-cols-12 gap-4'>
						<div className='col-span-8'>
							<header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
								<h1 className="text-xl font-semibold leading-6 text-red-700">
									<time dateTime="2022-01">{currentDate.format('MMMM YYYY')}</time>
								</h1>
								<div className="flex items-center">
									<div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
										<button type="button" className={`flex h-9 w-12 items-center justify-center 
											rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 
											hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50`}
											onClick={prevMonth}>
											<span className="sr-only">Previous month</span>
											<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
											</svg>
										</button>
										<button type="button" onClick={currentMonth} className={`hidden border-y border-gray-300 px-3.5 text-sm 
											font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block`}>
											Today
										</button>
										<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
										<button type="button" className={`flex h-9 w-12 items-center justify-center 
											rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 
											hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50`}
											onClick={nextMonth}>
											<span className="sr-only">Next month</span>
											<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
											</svg>
										</button>
									</div>
								</div>
							</header>
							<div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
								<div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-sm font-semibold leading-6 text-gray-700 lg:flex-none">
									<div className="flex justify-center bg-white py-2">
										<span>M</span>
										<span className="sr-only sm:not-sr-only">on</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>T</span>
										<span className="sr-only sm:not-sr-only">ue</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>W</span>
										<span className="sr-only sm:not-sr-only">ed</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>T</span>
										<span className="sr-only sm:not-sr-only">hu</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>F</span>
										<span className="sr-only sm:not-sr-only">ri</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>S</span>
										<span className="sr-only sm:not-sr-only">at</span>
									</div>
									<div className="flex justify-center bg-white py-2">
										<span>S</span>
										<span className="sr-only sm:not-sr-only">un</span>
									</div>
								</div>
								<div className="flex bg-gray-200 text-sm leading-6 text-gray-700 lg:flex-auto">
									<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
										{
										monthDateArr.map( (date, index) => (
											(date<startDateOfMonth || date>endDateOfMonth ) ? (
												<div key={index} className={`relative bg-gray-100 text-gray-500 px-3 py-2 min-h-32`}>
													<time className={`bg-gray-500 p-1 rounded-full text-white font-bold`} dateTime={date.format('dd/mm/yyyy')}>
														{date.format('DD')}
													</time>
												</div>
											) : (
												<div key={index} className="relative bg-white text-blue-500 px-3 py-2 min-h-32">
													<div className='flex justify-between'>
														<div>
															<time className={`p-1 rounded-full text-white font-bold justify-start
																${dateFormat(date) === dateFormat(moment().clone()) ? 'bg-red-700' : 'bg-blue-500'}
																`} dateTime={date.format('DD/MM/YYYY')}>
																{date.format('DD')} 
															</time>
														</div>
														{ 
															tithisHash2[date.format('DD/MM/YYYY')] ? (
																<div>
																	<button id="filterDropdownButton" 
																		data-dropdown-toggle={`filterDropdown${index}`} 
																		type="button">
																		<svg className="w-6 h-6 text-indigo-500 dark:text-white"
																			aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" 
																			height="24" fill="none" viewBox="0 0 24 24">
																			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"/>
																		</svg>
																	</button>
																	<div id={`filterDropdown${index}`} className={`z-10 hidden w-96 p-3 
																		bg-white border border-green-500 rounded-lg shadow dark:bg-gray-700`}>
																		<div className="px-3 py-2 bg-green-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
																			<h3 className="font-semibold text-green-700 dark:text-white">
																				राधावल्लभ सेवा/उत्सव का विवरण
																			</h3>
																		</div>
																		<div className="px-3 py-2">
																			{<div dangerouslySetInnerHTML={{__html: tithisHash2[date.format('DD/MM/YYYY')]}} />}
																		</div>
																	</div>

																</div>
															) : null 
														}
													</div>
													<div className='flex text-gray-600 mt-2 '>
														<span className='mr-2'>
															{tithisHash[date.format('DD/MM/YYYY')]}
														</span>
													</div>
												</div>
											)
										))
										}
									</div>
									<div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
										{
										monthDateArr.map( (date, index) => (
											(date<startDateOfMonth || date>endDateOfMonth ) ? (
												<button key={index} type="button" className={`flex h-14 flex-col bg-gray-200 px-3 py-2 text-gray-500 
													hover:bg-gray-100 focus:z-10`}>
													<time className='ml-auto' dateTime={date.format('dd/mm/yyyy')}>
														{date.format('DD')}
													</time>
													<span className="sr-only">0 events</span>
												</button>
											) : (
												<button key={index} type="button" className={`flex h-14 flex-col bg-white px-3 py-2 text-blue-700 
													hover:bg-gray-100 focus:z-10`}>
													<time className={`ml-auto ${date.format('DD/MM/yyyy') === moment().format('DD/MM/yyyy') && 'text-red-500'}`} dateTime={date.format('dd/mm/yyyy')}>
														{date.format('DD')}
													</time>
													<span className="sr-only">0 events</span>
												</button>
											)
										))
										}
									</div>
								</div>
							</div>
						</div>
						<div className='col-span-4 h-screen'>
							<header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 mb-3 lg:flex-none">
								<h1 className="text-xl font-semibold leading-6 text-gray-900">
									<time dateTime="2022-01">&nbsp;</time>
								</h1>
							</header>
							<div className={`grid grid-cols-7 gap-px bg-gray-200 text-center 
								text-sm font-semibold leading-6 border border-gray-300 text-gray-700 lg:flex-none mb-2`}>
								<div className="flex justify-center bg-gray-100 text-red-600 py-2 col-span-7">
									<span>तिथि सूची</span>
								</div>
							</div>
							<div className="overflow-y-auto h-5/6">
								{tithiList && tithiList.map( (tithi, index) => {
									return tithi.description ? (
										<div key={index} className=''>
											<div className='text-center text-sm text-green-600 bg-green-100 font-bold py-2 mb-1 rounded'>
												तिथि-{tithi.title} ( दिनांक - {moment(tithi.date).format('DD MMM, YYYY')})
											</div>
											<div className='text-center text-sm py-2 mb-2'>
												{tithi.description}
											</div>
										</div>
									) : null
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PBPanchangShow;