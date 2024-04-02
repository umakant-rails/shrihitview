import baseUrl from "../../services/AxiosService";
import {
  ARTICLE_TYPE_LIST,
  ARTICLE_TYPE_CREATED,
  ARTICLE_TYPE_UPDATED,
  ARTICLE_TYPE_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getTypes = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  });

  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/article_types?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);
 
  dispatch(dataDispatchToReducer(response, ARTICLE_TYPE_LIST));
}

export const createType = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/article_types', {article_type: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_TYPE_CREATED));
}

export const updateType = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/article_types/${id}`, {article_type: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  
  dispatch(dataDispatchToReducer(response, ARTICLE_TYPE_UPDATED));
}

export const deleteType = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/article_types/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_TYPE_DELETED));
}
