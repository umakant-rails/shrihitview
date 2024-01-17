import baseUrl from "../services/AxiosService";
import {
    AUTHOR_LIST,
    AUTHOR_SHOW,
    SANT_LIST,
    SANT_SHOW,
    SET_MESSAGE
} from "../utils/types";

export const getAuthors = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
    dispatch({
      type: AUTHOR_LIST, 
      payload: {
        statusCode: response.status,
        authors: response.data.authors,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const getSants = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors/sants', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: SANT_LIST, 
      payload: {
        statusCode: response.status,
        sants: response.data.sants,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const getSantBiography = (name) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/authors/${name}/sant_biography`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: SANT_SHOW, 
      payload: {
        statusCode: response.status,
        sants: response.data.sants,
        sant: response.data.sant
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}