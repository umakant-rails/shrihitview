import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePanchang, getPanchangs } from '../../../actions/admin/admin_panchangs';

const PanchangList = () => {
  const dispatch = useDispatch();
  const [panchangList, setPanchangList] = useState([]);
  const { panchangs } = useSelector( state => state.adminPanchang );

  useEffect( () => {
    dispatch(getPanchangs());
  }, [dispatch]);

  useEffect( () => {
    if(panchangs){setPanchangList(panchangs);}
  }, [panchangs]);

  const deleteAPanchang = (panchangId) => {
    const isTrue = window.confirm('Are to sure to delete this record ?');
    if(isTrue) { dispatch(deletePanchang(panchangId)); }
  }

  return (
    <div className='grid md:grid-cols-12 mt-5 pb-5'>
      <div className='col-start-2 col-span-10 shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
        <div className='bg-blue-50 px-2 py-2 text-2xl text-blue-800 border border-y-blue-700 shadow-xl mb-5 font-bold'>
          पंचांग सूची
        </div>
        <div className='flex justify-end mb-2'>
          <Link to="/admin/panchangs/new" className='inline-flex bg-blue-700 text-white px-4 py-2 rounded'>
            <svg className="w-6 h-6 text-white dark:text-white mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
            </svg>
            पंचांग जोड़े
          </Link>
        </div>
        <table className="w-full text-left text-gray-500 dark:text-gray-400 mb-5">
          <thead className="text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700 bg-yellow-500">
              <th scope="col" className="px-2 py-3">क्रमांक</th>
              <th scope="col" className="px-2 py-3">शीर्षक</th>
              <th scope="col" className="px-2 py-3">पंचांग का प्रकार</th>
              <th scope="col" className="px-2 py-3">विक्रम सम्वत</th>
              <th scope="col" className="px-2 py-3">गतिविधि</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {
              panchangList ? panchangList.map( (panchang, index) => 
                <tr key={index} className="border-b dark:border-gray-700 text-blue-500 cursor-pointer">
                  <td className='px-2 py-3'>{index+1}</td>
                  <td className='px-2 py-3'>{panchang.title}</td>
                  <td className='px-2 py-3'>{panchang.panchang_type}</td>
                  <td className='px-2 py-3'>{panchang.vikram_samvat}</td>
                  <td className='px-2 py-3 inline-flex'>
                    <Link to={`/admin/panchangs/${panchang.id}/edit`} >
                      <svg className="w-[30px] h-[30px] text-blue-500 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                      </svg>
                    </Link>
                    <Link to="#" onClick={e => deleteAPanchang(panchang.id)}>
                      <svg className="w-[30px] h-[30px] text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>
                    </Link>
                    <Link to={`/admin/panchangs/${panchang.id}/add_tithi`} 
                      className='bg-blue-600 text-white rounded px-2 py-1 text-sm font-bold'>
                      तिथि जोड़े
                    </Link>
                  </td>
                </tr>
              ) : (
                <tr className="border-b dark:border-gray-700 text-blue-500 cursor-pointer">
                  <td colspan="5" className='text-center'>
                    There is not data available.
                  </td>
                </tr>
              )
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanchangList;