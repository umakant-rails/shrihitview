import baseUrl from "../../services/AxiosService";
import {
  AUTHOR_CREATED,
  AUTHOR_LIST,
  AUTHOR_NEW,
  SAMPRADAYA_CREATED,
  AUTHOR_EDIT,
  AUTHOR_UPDATED,
  AUTHOR_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAuthors = (searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      return `${key}=${searchAttr[key]}`;
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/authors?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_LIST));
}

export const createAuthor = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/authors', {author: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_CREATED));
}
export const createSampradaya = (sampradaya) => async dispatch => {
  const response = await baseUrl.post(
    '/authors/sampradaya', {sampradaya: sampradaya}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SAMPRADAYA_CREATED));
} 
export const newAuthor = () => async dispatch => {
  const response = await baseUrl.get(
    '/authors/new', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_NEW));
}

export const editAuthor = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/authors/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_EDIT));
}

export const updateAuthor = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/authors/${id}`, {author: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_UPDATED));
}

export const deleteAuthor = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/authors/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, AUTHOR_DELETED));
}
