import baseUrl from "../../services/AxiosService";
import {
  ADMIN_TAG_LIST,
  ADMIN_TAG_APPROVED,
  ADMIN_TAG_UPDATED,
  ADMIN_TAG_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAdminTags = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/tags?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_TAG_LIST));
}

export const approveToTag = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/tags/${id}/tag_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_TAG_APPROVED));
}

export const updateAdminTag = (id, form) => async dispatch => {

  const response = await baseUrl.put(
    `/admin/tags/${id}`, {tag: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  
  dispatch(dataDispatchToReducer(response, ADMIN_TAG_UPDATED));
}

export const deleteAdminTag = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/tags/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, ADMIN_TAG_DELETED));
}