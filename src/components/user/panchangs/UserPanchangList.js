import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePanchang, getPanchangs } from '../../../actions/admin/admin_panchangs';

const UserPanchangList = () => {
  const dispatch = useDispatch();
  const [panchangList, setPanchangList] = useState([]);
  const { panchangs } = useSelector( state => state.adminPanchang );

  useEffect( () => {
    dispatch(getPanchangs());
  }, [dispatch]);

  useEffect( () => {
    if(panchangs){setPanchangList(panchangs);}
  }, [panchangs]);

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
            </tr>
          </thead>
          <tbody className='text-xl'>
            {
              panchangList ? panchangList.map( (panchang, index) => 
                <tr key={index} className="border-b dark:border-gray-700 text-blue-500 cursor-pointer">
                  <td className='px-2 py-3'>{index+1}</td>
                  <td className='px-2 py-3'>
                    <Link to={`/users/panchangs/${panchang.id}`} >
                      {panchang.title}
                    </Link>
                  </td>
                  <td className='px-2 py-3'>
                    <Link to={`/users/panchangs/${panchang.id}`} >
                      {panchang.panchang_type}
                    </Link>  
                  </td>
                  <td className='px-2 py-3'>
                    <Link to={`/users/panchangs/${panchang.id}`} >
                      {panchang.vikram_samvat}
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

export default UserPanchangList;