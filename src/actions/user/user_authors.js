import baseUrl from "../../services/AxiosService";
import {
  AUTHOR_CREATED,
  AUTHOR_LIST,
  AUTHOR_NEW,
  SAMPRADAYA_CREATED,
  AUTHOR_EDIT,
  AUTHOR_UPDATED,
  AUTHOR_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getAuthors = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/authors?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: AUTHOR_LIST, 
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

export const createAuthor = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/authors', {author: formValues}
  ).then(response => {
    return response;
  });

  if(response && response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: AUTHOR_CREATED, 
      payload: response.data,
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}
export const createSampradaya = (sampradaya) => async dispatch => {
  const response = await baseUrl.post(
    '/authors/sampradaya', {sampradaya: sampradaya}
  ).then(response => {
    return response;
  });
 
  if(response && response.data.error === undefined){
    dispatch({
      type: SAMPRADAYA_CREATED, 
      payload: response.data,
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
} 
export const newAuthor = () => async dispatch => {
  const response = await baseUrl.get(
    '/authors/new', 
  ).then(response => {
    return response;
  });
  if(response && response.data.error === undefined){
    dispatch({
      type: AUTHOR_NEW, 
      payload: response.data,
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const editAuthor = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/authors/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  });
  if(response && response.data.error === undefined){
    dispatch({
      type: AUTHOR_EDIT, 
      payload: response.data,
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const updateAuthor = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/authors/${id}`, {author: form}
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
      type: AUTHOR_UPDATED, 
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

export const deleteAuthor = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/authors/${id}`
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
      type: AUTHOR_DELETED,
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
