import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPanchangs } from '../../../actions/public/panchangs';


const PBPanchangList = () => {
  const dispatch = useDispatch();
  const [panchangList, setPanchangList] = useState([]);
  const { panchangs } = useSelector( state => state.panchang );

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
                    <Link to={`/pb/panchangs/${panchang.id}`} >
                      {panchang.title}
                    </Link>
                  </td>
                  <td className='px-2 py-3'>
                    <Link to={`/pb/panchangs/${panchang.id}`} >
                      {panchang.panchang_type}
                    </Link>  
                  </td>
                  <td className='px-2 py-3'>
                    <Link to={`/pb/panchangs/${panchang.id}`} >
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

export default PBPanchangList;