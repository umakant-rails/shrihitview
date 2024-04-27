import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { PAKSH, TITHIS } from '../../../utils/types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ReactTransliterate } from 'react-transliterate';
import { deletePanchangTithi, getEditingData, updatePanchangTithi } from '../../../actions/admin/admin_panchang_tithis';
import { dateFormat } from '../../../utils/utilityFunctions';
import Datepicker from 'flowbite-datepicker/Datepicker';
import { toast } from 'react-toastify';

//https://tailwindcomponents.com/component/calendar-4

const tithiObj = {
  date: '', 
  tithi: '', 
  paksh: '', 
  description: '', 
  title: '', 
  year: '',
  month: '',
  hindi_month_id: ''
}

const EditTithi = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(moment().clone());
  const [tithisList, setTithisList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [selectedTithi, setSelectedTithi] = useState();

  const [panchangObj, setPanchangObj] = useState();
  const [activeTithi, setActiveTithi] = useState();
  const [formValues, setFormValues] = useState(tithiObj);
  const datePickerElement = document.getElementById('date-picker-id');
  if(datePickerElement){
    new Datepicker(datePickerElement, {format: 'dd/mm/yyyy'});
  }
  
  const { id } = useParams();
	const { panchang, tithis, months } = useSelector( state => state.adminPTithi);

  useEffect( () => {
    dispatch(getEditingData(id, currentDate));
  }, [dispatch, id, currentDate]);

  useEffect( () => { 
    if(panchang) setPanchangObj(panchang);
    if(months) setMonthList(months);
    if(tithis) setTithisList(tithis)
    setFormValues(tithiObj);
  }, [panchang, months, tithis]);

  const selectRecordToUpdate = (id) => {
    const tithi = tithisList.filter( (tithi) => tithi.id === id)[0];
    setSelectedTithi(tithi);
    setFormValues(formValues => ({
      ...formValues, 
      date: dateFormat(tithi.date), 
      tithi: tithi.tithi, 
      paksh: tithi.paksh, 
      description: tithi.description, 
      title: tithi.title, 
      year: tithi.year,
      month: tithi.title.split(",")[0],
      hindi_month_id: tithi.hindi_month_id
    }));
  }
  const selectTithi = (tithi, paksh) => {
    if(`${paksh}-${tithi}` === activeTithi){
      setFormValues(formValues => ({...formValues, tithi: '', paksh: '', title: ''}));
      setActiveTithi('');
    } else {
      let titleTemp = `${formValues.month}, ${paksh}-${tithi}`;
      setFormValues(formValues => ({
        ...formValues, tithi: tithi, paksh: paksh, 
        title: titleTemp
      }));
      setActiveTithi(`${paksh}-${tithi}`);
    }
  }

  const onInputChange = (e) => {
    console.log(e.target.value)
  }
  const selectBoxUpdate = event => {
    const monthName = event.nativeEvent.target[event.target.selectedIndex].text

    setFormValues(formValues => ({
      ...formValues, 
      hindi_month_id: event.target.value,
      month: monthName,
      title: `${monthName}, ${formValues.paksh}-${formValues.tithi}`, 
    }));
  }
  const currentMonth = () => { setCurrentDate(moment().clone()); dispatch(getEditingData(id, currentDate)); }
	const nextMonth = () => { currentDate.add(1, "month"); dispatch(getEditingData(id, currentDate));}
	const prevMonth = () => { currentDate.subtract(1, "month"); dispatch(getEditingData(id, currentDate));}

  const onsubmit = (e) => {
    e.preventDefault();
    if(formValues.date === ''){ 
      toast.error('कृपया पहले तिथि दिनांक को चुने.');
    } else if(formValues.hindi_month_id === ''){ 
      toast.error('कृपया पहले तिथि के मास को चुने.');
    } else if (formValues.tithi === ''){ 
      toast.error('कृपया पहले तिथि को चुने.');
    } else {
      formValues['date'] = datePickerElement.value;
      dispatch(updatePanchangTithi(panchangObj.id, selectedTithi.id, formValues));
    }
  }

  const deleteTithi = (panchangId, tithiId) => {  
    const isTrue = window.confirm("Are you sure you want to delete this record ?");
    if(isTrue){
      dispatch(deletePanchangTithi(panchangId, tithiId));
    }
  }

	return (
		<div className='grid md:grid-cols-12 mt-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5 pb-8'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          पंचांग तिथि अद्यतन फॉर्म
        </div>
        <div className='grid grid-cols-12 gap-5 mb-5'>
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
            <div className='max-h-96 overflow-y-auto'>
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border-b dark:border-gray-700 bg-yellow-500">
                  <th scope="col" className="px-2 py-2">क्रमांक</th>
                    <th scope="col" className="px-2 py-2">रचनाकार/लेखक</th>
                    <th scope="col" className="px-2 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tithisList.map( (tithi, index) => 
                      (<tr key={index} className={`${index%2 === 0 ? 'bg-gray-50' : 'bg-gray-200'}`}>
                        <td>{dateFormat(tithi.date, false)}</td>
                        <td>{tithi.title}</td>
                        <td className='inline-flex py-2'>
                          <button onClick={e => selectRecordToUpdate(tithi.id)}>
                            <svg className="w-[20px] h-[20px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                            </svg>
                          </button>
                          <button onClick={e => deleteTithi(tithi.panchang_id, tithi.id)}>
                            <svg className="w-[20px] h-[20px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table> 
            </div>
          </div>
          <div className='col-span-5'>
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 mb-3 lg:flex-none">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                <time dateTime="2022-01">
                  {panchangObj ? `${`विक्रम सम्वत ${panchangObj.vikram_samvat}`}` : null}
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
                          onClick = {e => selectTithi(tithi, paksh) }
                          className={`flex h-18 flex-col px-3 py-2 hover:bg-yellow-600 
                          focus:z-10 ${paksh === PAKSH[0] ? 'bg-gray-600' : 'bg-white' }
                          ${activeTithi === `${paksh}-${tithi}` ? '!bg-rose-400' :''}`}>
                          <time className={`ml-auto ${paksh === PAKSH[0] ? 'text-white' : 'text-gray-900' }`}>
                            {paksh} {tithi}
                          </time>
                          <span className="sr-only">0 events</span>
                        </button>
                      ))
                    ))
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
                <div>
                  <input type="text" datepicker="true" id="date-picker-id"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                    dark:focus:border-blue-500`} placeholder="Select date"
                    value={formValues.date || ''} onChange={onInputChange } />
                </div>
              </div>
              <div className="mb-2">
                <label className="block mb-2 font-medium text-gray-90 font-bold">
                  पंचांग मास 
                </label>
                <select id="hindi_month_id" name="hindi_month_id" 
                  value={formValues.hindi_month_id || ''}
                  onChange={selectBoxUpdate}
                  className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                    rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                    dark:shadow-sm-light`}>
                    <option value="">मास चुने</option>
                    {
                      monthList && monthList.map( (month, index) => 
                        <option key={index} value={month.id}>{month.name}</option>
                      )
                    }
                </select>
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
                  दिनांक
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
                  तिथि अद्यतित करे
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

export default EditTithi;