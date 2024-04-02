import baseUrl from "../services/AxiosService";
import {
  USER_REGISTRATION,
  ERROR_HANDLING,
  SET_MESSAGE
} from "../utils/types";
import dataDispatchToReducer from "./shared_action";

export const userRegister = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/signup', 
    {user: formValues}, {}
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
      return response.data.user
    } else {
      dispatch({type: SET_MESSAGE, msg_type: "error", payload: response.data.error.join("\n")});
    }
  } else {
    dispatch({type: SET_MESSAGE, msg_type: "error", payload: response.data});
  }
}
