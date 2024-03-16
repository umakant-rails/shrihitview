import baseUrl from "../../services/AxiosService";
import {
  SET_MESSAGE,
  ADMIN_TAG_LIST,
  ADMIN_TAG_APPROVED,
  ADMIN_TAG_UPDATED,
  ADMIN_TAG_DELETED,
} from "../../utils/types";

export const getAdminTags = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/tags?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: ADMIN_TAG_LIST, 
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

export const approveToTag = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/tags/${id}/tag_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_TAG_APPROVED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}

export const updateAdminTag = (id, form) => async dispatch => {

  const response = await baseUrl.put(
    `/admin/tags/${id}`, {tag: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  
  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_TAG_UPDATED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}

export const deleteAdminTag = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/tags/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_TAG_DELETED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}