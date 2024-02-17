import baseUrl from "../../services/AxiosService";
import {
  TAG_LIST,
  TAG_CREATED,
  TAG_EDIT,
  TAG_UPDATED,
  TAG_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getTags = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/tags?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: TAG_LIST, 
      payload: {
        statusCode: response.status,
        tags: response.data.tags,
        total_tags: response.data.total_tags,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const createTag = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/tags', {tag: formValues}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response && response.status === 200){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: TAG_CREATED, 
      payload: {
        tag: response.data.tag,
        tags: response.data.tags,
        total_tags: response.data.total_tags,
        current_page: response.data.current_page
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const editTag = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/tags/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response && response.status === 200){
    dispatch({
      type: TAG_EDIT, 
      payload: {
        statusCode: response.status,
        author: response.data.author,
        sampradayas: response.data.sampradayas,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const updateTag = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/tags/${id}`, {tag: form}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: TAG_UPDATED, 
      payload: {
        tag: response.data.tag,
        tags: response.data.tags,
        total_tags: response.data.total_tags,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const deleteTag = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/tags/${id}`
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: TAG_DELETED,
      payload: {
        tag: response.data.tag,
        tags: response.data.tags,
        total_tags: response.data.total_tags,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}
