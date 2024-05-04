import baseUrl from "../services/AxiosService";
import {
  USER_REGISTRATION,
  ERROR_HANDLING,
  PASSWORD_UPDATED,
  SET_MESSAGE
} from "../utils/types";
import dataDispatchToReducer from "./shared_action";

export const userRegister = (formValues) => async dispatch => {
  formValues['role_id'] = 3;
  
  const response = await baseUrl.post(
    '/signup', 
    {user: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, USER_REGISTRATION));
};

export const userLogin = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/login', 
    {user: formValues}, {}
  ).then( response => {
    return response;
  }).catch( error => {
    return error.response
  });

  if(response.status === 200){
    if (response.data.error === undefined) {
      localStorage.setItem("token", response.headers.authorization);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));

      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.status.message});
      return response.data;
    } else {
      dispatch({type: SET_MESSAGE, msg_type: "error", payload: response.data.error.join("\n")});
    }
  } else {
    dispatch({type: SET_MESSAGE, msg_type: "error", payload: response.data});
  }
}

export const updatePassword = (formValues) => async dispatch => {
  const response = await baseUrl.put(
    '/users/passwords/update', 
    {user: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, PASSWORD_UPDATED));
}

export const getUserRole = (user_id) => async dispatch => {
  const response = await baseUrl.post(
    '/users/get_role',
  ).then(response => {
    return response;
  }).catch( error => error.response);
  return response;
}

export const getCurrentUser = () => async dispatch => {
  return await baseUrl.get('/current_user');
}