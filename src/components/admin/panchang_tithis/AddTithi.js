import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { PAKSH, TITHIS } from '../../../utils/types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from 'react-transliterate';
import { createPanchangTithi, navigateMonth, newPanchangTithi} from '../../../actions/admin/admin_panchang_tithis';
import { dateFormat } from '../../../utils/utilityFunctions';
import { Link } from 'react-router-dom';
//https://tailwindcomponents.com/component/calendar-4

const tithiObj = {
  date: '', 
  tithi: '', 
  paksh: '', 
  description: '', 
  title: '', 
  year: '',
  hindi_month_id: '',
  month: '',
  activeTithi: ''
}
let month = null;

const AddTithi = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(moment().clone());
  const [startDateOfMonth, setStartDateOfMonth] = useState();
  const [endDateOfMonth,setEndDateOfMonth] = useState();
  const [monthDateArr, setMonthDateArr] = useState([]);

  const [panchangObj, setPanchangObj] = useState();
  const [tithisHash, setTithisHash] = useState({});
  const [formValues, setFormValues] = useState(tithiObj);

  const { id } = useParams();
	const { panchang, current_month, tithis, tithi, isCreated } = useSelector( state => state.adminPTithi);

  useEffect( () => {
    dispatch(newPanchangTithi(id)).then(response => {
      const tithi = response.data.last_tithi;
      month = response.data.month;
      let lastDate = tithi ? moment(tithi.date).clone() : moment().clone();
      if(tithi){
        lastDate.add(1, "days");
        nextTithi(tithi.paksh, tithi.tithi);
      }
      setCurrentDate(lastDate);
      selectDate(lastDate);
      createDateArr(lastDate);
    }).catch( error => error.response);
  }, []);

  useEffect( () => { 
    if(panchang) setPanchangObj(panchang);
    if(tithis) createTithisHash(tithis);

    if(current_month){
      month = current_month;
      setFormValues(formValues => ({
        ...formValues, hindi_month_id: current_month.id, month: current_month.name, description: ''
      }));
    }

    if(tithi){
      if (isCreated && dateFormat(tithi.date) === dateFormat(endDateOfMonth)) {
        nextMonth(); 
      }
      const nextDate = moment(tithi.date).clone();
      nextDate.add(1, "days");
      selectDate(nextDate);
      nextTithi(tithi.paksh, tithi.tithi);
    }
    
  }, [panchang, current_month, tithis, tithi, endDateOfMonth]);

  const createTithisHash = (tithis) => {
    let tithiHs1 = {};
    tithis.forEach((tithi) => {
      const dt = moment(tithi.date).format('DD/MM/YYYY');
      if(tithiHs1[dt] !== undefined && tithiHs1[dt].split(",")[0] !== tithi.title.split(",")[0]){
        tithiHs1[dt] = tithiHs1[dt]+","+tithi.title
      } else if (tithiHs1[dt] !== undefined){
        tithiHs1[dt] = tithiHs1[dt]+","+tithi.paksh+"-"+tithi.tithi;
      } else{
        tithiHs1[dt] = tithi.title;
      }
    });
    setTithisHash(tithiHs1);
  }

  const selectDate = (date, actionType) => {
    if(actionType && date.format('DD/MM/YYYY') === formValues.date){
      setFormValues(formValues => ({...formValues, date: '', year: ''}));
    } else{
      setFormValues(formValues => ({
        ...formValues, date: date.format('DD/MM/YYYY'), year: date.format('YYYY')
      }));
    }
  }

  const nextTithi = (paksh, tithi) => {
    if(tithi === 15 && PAKSH[1] === paksh){ 
      paksh = PAKSH[0];
    } else if (tithi === 15 && PAKSH[0] === paksh) {
      paksh = PAKSH[1];
    }
    tithi = (tithi === 15) ? tithi%14 : tithi+1;
    selectTithi(paksh, tithi);
  }   

  const selectTithi = (paksh, tithi, actionType=null) => {
    if(actionType && `${paksh}-${tithi}` === formValues.activeTithi){
      setFormValues(formValues => ({...formValues, tithi: '', paksh: '', title: '', activeTithi: ''}));
    } else {
      let titleTemp = month ? `${month.name}, ${paksh}-${tithi}` : null;
      setFormValues(formValues => ({
        ...formValues, tithi: tithi, paksh: paksh, 
        title: titleTemp, activeTithi: `${paksh}-${tithi}`
      }));
    }
  }

	const createDateArr = (newDate) => {
	  setStartDateOfMonth(newDate.clone().startOf('month'));
    setEndDateOfMonth(newDate.clone().endOf('month'));

    const firstDate = newDate.clone().startOf('month').startOf('week');
    const lastDate = newDate.clone().endOf('month').endOf('week')
    let arr = [];

    while(lastDate >= firstDate ){
      arr.push(firstDate.clone()); firstDate.add(1, "days");  
    }
    dispatch(navigateMonth(id, newDate));
		setMonthDateArr(arr);
	}

	const currentMonth = () => { setCurrentDate(moment().clone()); createDateArr(moment().clone()); }
	const nextMonth = () => { currentDate.add(1, "month"); createDateArr(currentDate); }
	const prevMonth = () => { currentDate.subtract(1, "month"); createDateArr(currentDate); } 

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(createPanchangTithi(panchangObj.id, formValues));
  }
	return (
		<div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5 pb-8'>
        <div className={`bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 
          shadow-xl mb-3 font-bold`}>
          पंचांग तिथि फॉर्म
        </div>
        <div className='flex justify-end mb-3'>
          {
            panchangObj && <Link to={`/admin/panchangs/${panchangObj.id}/edit_tithis`} 
              className="px-4 py-1 bg-blue-600 text-white rounded">
              Edit Tithi
            </Link>
          }
        </div>
        <div className='grid grid-cols-12 gap-5 mb-5 border-t shadow-xl'>
          <div className='col-span-7'>
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
              </div>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5">
              <div className={`grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center 
                text-sm font-semibold leading-6 text-gray-700 lg:flex-none`}>
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
              <div className="flex bg-gray-200 text-sm leading-6 text-gray-700">
                <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px">
                  {
                    monthDateArr.map( (date, index) => (
                      (date<startDateOfMonth || date>endDateOfMonth) ? (
                        <button key={index} type="button"
                          className={`flex min-h-20 flex-col bg-gray-200 px-1 py-2 text-gray-500 
                          hover:bg-gray-100 focus:z-10`}>
                          <time className='ml-auto' dateTime={date.format('DD/MM/YYYY')}>
                            {date.format('DD')}
                          </time>
                          <span className="sr-only">0 events</span>
                        </button>
                      ) : (
                        <button key={index} type="button" onClick={e => selectDate(date, true)}
                          className={`flex min-h-20 flex-col bg-white px-1 py-2 text-blue-700 
                          hover:bg-gray-100 focus:z-10
                          ${formValues.date === `${date.format('DD/MM/YYYY')}` ? '!bg-rose-400' :''}`}>
                          <time className={`ml-auto  ${date.format('DD/MM/YYYY') === moment().format('DD/MM/yyyy') && 'text-red-800'}`} dateTime={date.format('DD/DD/YYYY')}>
                            {date.format('DD')} 
                          </time>
                          <span className="text-xs">
                            {tithisHash[date.format('DD/MM/YYYY')]}
                          </span>
                          
                        </button>
                      )
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-5'>
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 mb-3 lg:flex-none">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                <time dateTime="2022-01">
                  {panchangObj ? `${`विक्रम सम्वत ${panchangObj.vikram_samvat}`}` : null}, {formValues.month && formValues.month}
                </time>
              </h1>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5">
              <div className={`grid grid-cols-7 gap-px bg-gray-200 text-center 
                text-sm font-semibold leading-6 border border-gray-300 text-gray-700 lg:flex-none`}>
                <div className="flex justify-center bg-white py-2 col-span-7">
                  <span>तिथि सूची</span>
                </div>
              </div>
              <div className="flex bg-gray-200 text-sm leading-6 text-gray-700">
                <div className="isolate grid w-full grid-cols-6 grid-rows-5 gap-px">
                  {
                    PAKSH.map( (paksh, index1) => (
                      TITHIS.map( (tithi, index2) => (
                        <button key={`${index1}${index2}`} type="button" 
                          onClick = {e => selectTithi(paksh, tithi, true) }
                          className={`flex h-20 flex-col px-3 py-2 hover:bg-yellow-600 
                          focus:z-10 ${paksh === PAKSH[0] ? 'bg-gray-600' : 'bg-white' }
                          ${formValues.activeTithi === `${paksh}-${tithi}` ? '!bg-rose-400' :''}`}>
                          <time className={`ml-auto ${paksh === PAKSH[0] ? 'text-white' : 'text-gray-900' }`}>
                            {paksh} {tithi}
                          </time>
                          <span className="sr-only">0 events</span>
                        </button>
                      ))
                    ))
                    // monthTithis().map( (tithi, index) => 
                    //   <button key={`${index}`} type="button" 
                    //     onClick = {e => selectTithi('paksh', 'tithi', true) }
                    //     className={`flex h-20 flex-col px-3 py-2 hover:bg-yellow-600 
                    //     focus:z-10 ${tithi.indexOf(PAKSH[0]) >= 0 ? 'bg-gray-600' : 'bg-white' }
                    //     ${formValues.activeTithi === `${'paksh'}-${'tithi'}` ? '!bg-rose-400' :''}`}>
                    //     <time className={`ml-auto ${tithi.indexOf(PAKSH[0]) >= 0 ? 'text-white' : 'text-gray-900' }`}>
                    //       {tithi}
                    //     </time>
                    //     <span className="sr-only">0 events</span>
                    //   </button>
                    // )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={onsubmit} >
          <div className='grid md:grid-cols-2 gap-6 border-y py-4 mb-4 border-gray-400'>
            <div className='col'>
              <div className="mb-2">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  दिनांक
                </label>
                <label className="block mb-2 h-9 font-medium text-gray-900 border border-gray-400 px-2 py-1 rounded">
                  {formValues.date || ''}
                </label>
              </div>
              <div className="mb-2">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  पंचांग मास 
                </label>
                <label className="block mb-2 h-9 font-medium text-gray-900 border border-gray-400 px-2 py-1 rounded">
                  {formValues.month || ''}
                </label>
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  तिथि शीर्षक
                </label>
                <label className="block mb-2 h-9 font-medium text-gray-900 border border-gray-400 px-2 py-1 rounded">
                  {formValues.title || ''}
                </label>
              </div>
            </div>
            <div className='col'>
              <div className="mb-10">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  विवरण
                </label>
                <ReactTransliterate
                  value={formValues.description}
                  onChangeText={(text) => {setFormValues(formValues => ({...formValues, description: text})) }}
                  renderComponent={(props) => <textarea  
                    {...props} 
                  />}
                  rows="4"
                  className={`block p-2.5 w-full mb-2 text-sm text-gray-900 bg-gray-50 rounded border-b 
                    border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                    dark:focus:border-blue-500`}
                  lang={'hi'}
                />
              </div>
              <div className='mb-2 pt-2'>
                <button type="submit" 
                  className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  पंचांग जोड़े
                </button>
                <button type="button" 
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

		</div>
	);
};

export default AddTithi;