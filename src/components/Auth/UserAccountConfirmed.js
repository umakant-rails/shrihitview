import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmUserAccount } from '../../slices/authSlice';

const UserAccountConfirmed = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {account_confirmed} = useSelector(state => state.auth)

  useEffect( () => {
    const confirmation_token = searchParams.get('confirmation_token');
    if(confirmation_token){
      dispatch(confirmUserAccount(confirmation_token));
    }
  }, [searchParams]);

  return (
    <div>
      { account_confirmed ? (
          <div className='text-xl border px-2 py-3 rounded bg-green-100 text-green-500'>
            Your Account is confirmed.
          </div>
        ) : null 
      }
    </div>
  );
};

export default UserAccountConfirmed;
