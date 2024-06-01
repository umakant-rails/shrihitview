import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../../utils/utilityFunctions';
import { getUserSuggestion } from '../../../slices/user/userSuggestionSlice';

const UserSuggestionShow = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [suggestionObj, setSuggestionObj] = useState(null);
  const { suggestion } = useSelector( state => state.userSuggestion );
  
  useEffect( () => {
    dispatch(getUserSuggestion(id));
  }, [dispatch, id]);

  useEffect( () => {
    setSuggestionObj(suggestion);
  }, [suggestion]);
  
  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 p-5'>
        <div className={`bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-50 
          border-y border-x-4 border-zinc-800 px-3 py-2`}>
          <p className='text-2xl font-bold text-cyan-800 mb-1 px-2'>
            {suggestionObj && `सुझाव - ${suggestionObj.title}`}
          </p>
          {
            suggestionObj && <p className='px-2'>
              ( <span className='font-bold text-red-500 text-medium'>रचनाकार - </span>{suggestionObj.username},&nbsp;&nbsp;  
              <span className='font-bold text-red-500 text-medium'>सृजन तिथि - </span>{dateFormat(suggestionObj.created_at)},&nbsp;&nbsp;  
              <span className='font-bold text-red-500 text-medium'>रचना प्रकार - </span> सुझाव )
            </p>
          }
        </div>
        <div className='text-2xl overflow-hidden min-h-96 p-5 leading-10 mb-3 mb-5'>
          {suggestionObj && <div dangerouslySetInnerHTML={{__html: suggestionObj.description}} />}
        </div>
      </div>
    </div>
  );
};

export default UserSuggestionShow;