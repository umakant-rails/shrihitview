import baseUrl from "../services/AxiosService";
import {
  USER_REGISTRATION,
  ERROR_HANDLING,
  SET_MESSAGE
} from "../utils/types";

export const userRegister = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/signup', 
    {user: formValues}, {}
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.status.message,
    });
    dispatch({
      type: USER_REGISTRATION, 
      payload: {
        statusCode: response.status,
        message: response.data.status.message
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
    // dispatch({
    //   type: ERROR_HANDLING, 
    //   payload: {
    //     statusCode: 401,
    //     message: response.data.status.message
    //   }
    // });
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
    console.log(error)
    return error.response
  });

  if(response.status === 200){
    if (response.data.error === undefined) {
      localStorage.setItem("token", response.headers.authorization);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));

      dispatch({
        type: SET_MESSAGE,
        msg_type: "success",
        payload: response.data.status.message,
      });
      return response.data.user
    } else {
      dispatch({
        type: SET_MESSAGE,
        msg_type: "error",
        payload: response.data.error.join("\n"),
      });
    }
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data,
    });
  }
}
