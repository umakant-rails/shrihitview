import baseUrl from "../../services/AxiosService";
import {
  TAG_LIST,
  TAG_CREATED,
  TAG_UPDATED,
  TAG_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getTags = (searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      return `${key}=${searchAttr[key]}`;
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/tags?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, TAG_LIST));
}

export const createTag = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/tags', {tag: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, TAG_CREATED));
}

export const updateTag = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/tags/${id}`, {tag: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, TAG_UPDATED));
}

export const deleteTag = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/tags/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, TAG_DELETED));
}
