import baseUrl from "../services/AxiosService";
import {
  USER_LOGIN,
  USER_REGISTRATION,
  ERROR_HANDLING
} from "../utils/types";

export const userRegister = (formValues) => async dispatch => {
  let statusCode = null; 
  const response = await baseUrl.post(
    '/signup', 
    {user: formValues}, {}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status == 200){
    dispatch({
      type: USER_REGISTRATION, 
      payload: {
        statusCode: response.data.status.code,
        message: response.data.status.message
      }
    });
  } else {
    dispatch({
      type: ERROR_HANDLING, 
      payload: {
        statusCode: 401,
        message: response.data.status.message
      }
    });
  }
  // return Promise.resolve(response.data);
};

export const userLogin = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/login', 
    {user: formValues}, {}
  ).then( response => { 
    return response;
  }).catch( error => {
    return error.response;
  });  

  if(response.status == 200){
    dispatch({
      type: USER_LOGIN, 
      payload: {
        statusCode: response.status,
        user: response.data.data, 
        token: response.headers.authorization,
        message: response.data.status.message
      }
    });
  } else {
    dispatch({
      type: ERROR_HANDLING, 
      payload: {
        statusCode: 401,
        message: response.data
      }
    });
  }
}

export const userLogout = (formValues) => async dispatch => {
  const response = await baseUrl.delete('/logout', {user: formValues},{});
  return Promise.resolve(response.data);
}