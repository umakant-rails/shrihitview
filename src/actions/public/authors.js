import baseUrl from "../../services/AxiosService";
import {
  PB_AUTHOR_LIST,
  PB_AUTHOR_SHOW,
  PB_SANT_LIST,
  PB_SANT_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAuthors = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key => {
    if(searchAttrs[key]){ 
      return `${key}=${searchAttrs[key]}` 
    }
  })

  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/pb/authors?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_AUTHOR_LIST));
}
export const getAuthorArticles = (name, page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/authors/${name}?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_AUTHOR_SHOW));
};

export const getSants = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors/sants',
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SANT_LIST));
}

export const getSantBiography = (name) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/authors/${name}/sant_biography`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SANT_SHOW));
}