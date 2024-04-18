import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
//https://tailwindcomponents.com/component/calendar-4

const AddTithi = () => {
	const [currentDate, setCurrentDate] = useState(moment().clone());
  const [startDateOfMonth, setStartDateOfMonth] = useState();
  const [endDateOfMonth,setEndDateOfMonth] = useState();
  const [monthDateArr, setMonthDateArr] = useState([]);
	
  useEffect( () => { currentDate.subtract(1, "month"); nextMonth(); }, []);

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
	}
	const currentMonth = () => { setCurrentDate(moment().clone()); createDateArr(moment().clone()); }
	const nextMonth = () => { currentDate.add(1, "month"); createDateArr(currentDate); }
	const prevMonth = () => { currentDate.subtract(1, "month"); createDateArr(currentDate); }


	return (
		<div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5 pb-8'>
     		<header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
					<h1 className="text-xl font-semibold leading-6 text-gray-900">
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
						<div className="hidden md:ml-4 md:flex md:items-center">
							<button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add event</button>
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
                    <time className={`p-1 rounded-full text-white font-bold
											${date.format('DD/MM/yyyy') === moment().format('DD/MM/yyyy') ? 'bg-red-700' : 'bg-blue-500'}
											`} dateTime={date.format('dd/mm/yyyy')}>
                      {date.format('DD')}
                    </time>
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
		</div>
	);
};

export default AddTithi;