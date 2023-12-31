import baseUrl from "../services/AxiosService";
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  ERROR_HANDLING,
  SET_MESSAGE
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
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.status.message,
    });
    dispatch({
      type: USER_REGISTRATION, 
      payload: {
        isRegistered: true
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.status.message,
    });
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
    localStorage.setItem("token", response.headers.authorization);
    localStorage.setItem("currentUser", JSON.stringify(response.data.data));
    
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.status.message,
    });

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
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data,
    });
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
  // const response = await baseUrl.delete('/logout', {user: formValues},{});
  // return Promise.resolve(response.data);
  dispatch({
    type: SET_MESSAGE,
    msg_type: "success",
    payload: 'Successfully logged out.',
  });

  dispatch({
    type: USER_LOGOUT, 
    payload: {
      isLoggedOut: true,
      user: null, 
      token: null,
      message: 'Successfully logged out.'
    }
  });
}