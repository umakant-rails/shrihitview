import baseUrl from "../../services/AxiosService";
import {
  PB_AUTHOR_LIST,
  PB_AUTHOR_SHOW,
  PB_SANT_LIST,
  PB_SANT_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getAuthors = (searchAttrs) => async dispatch => {
  const arr = [];
  Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      arr.push(`${key}=${searchAttrs[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/pb/authors?${searchAttrStr}`, 
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
export const getAuthorArticles = (name, page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/authors/${name}?page=${page}`, 
  ).then(response => {
    return response;
  }).catch(error => error.response);

  if(response.data.error === undefined){
    dispatch({
      type: PB_AUTHOR_SHOW, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
  // return Promise.resolve(response.data);
};

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