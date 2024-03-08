import baseUrl from "../../services/AxiosService";
import {
  ARTICLE_TYPE_LIST,
  ARTICLE_TYPE_CREATED,
  ARTICLE_TYPE_UPDATED,
  ARTICLE_TYPE_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getTypes = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/article_types?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });
 
  if(response.data.error === undefined){
    dispatch({
      type: ARTICLE_TYPE_LIST, 
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

export const createType = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/article_types', {article_type: formValues}
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: ARTICLE_TYPE_CREATED, 
      payload: response.data
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const updateType = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/article_types/${id}`, {article_type: form}
  ).then(response => {
    return response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: ARTICLE_TYPE_UPDATED, 
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

export const deleteType = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/article_types/${id}`
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: ARTICLE_TYPE_DELETED,
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
