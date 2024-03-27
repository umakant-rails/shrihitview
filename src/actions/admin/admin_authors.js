import baseUrl from "../../services/AxiosService";
import {
  SET_MESSAGE,
  ADMIN_AUTHOR_LIST,
  ADMIN_AUTHOR_APPROVED,
  ADMIN_AUTHOR_DELETED
} from "../../utils/types";

export const getAdminAuthors = (searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key => {
    if(searchAttr[key]){
      return (`${key}=${searchAttr[key]}`)
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/authors?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: ADMIN_AUTHOR_LIST, 
      payload: response.data,
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const approveToAuthor = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/authors/${id}/author_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_AUTHOR_APPROVED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}

export const deleteAdminAuthor = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/authors/${id}`, {data: searchAttrs},
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_AUTHOR_DELETED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}