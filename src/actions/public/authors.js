import baseUrl from "../../services/AxiosService";
import {
  PB_AUTHOR_LIST,
  //AUTHOR_SHOW,
  PB_SANT_LIST,
  PB_SANT_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getAuthors = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_AUTHOR_LIST, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const getSants = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors/sants',
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_SANT_LIST,
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const getSantBiography = (name) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/authors/${name}/sant_biography`,
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_SANT_SHOW,
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}