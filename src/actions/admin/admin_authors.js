import baseUrl from "../../services/AxiosService";
import {
  ADMIN_AUTHOR_LIST,
  ADMIN_AUTHOR_APPROVED,
  ADMIN_AUTHOR_DELETED
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAdminAuthors = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key => {
    if(searchAttrs[key]){
      return (`${key}=${searchAttrs[key]}`)
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/authors?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_AUTHOR_LIST));
}

export const approveToAuthor = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/authors/${id}/author_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_AUTHOR_APPROVED));
}

export const deleteAdminAuthor = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/authors/${id}`, {data: searchAttrs},
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_AUTHOR_DELETED));
}