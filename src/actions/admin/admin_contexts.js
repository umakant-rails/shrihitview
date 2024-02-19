import baseUrl from "../../services/AxiosService";
import {
  CONTEXT_LIST,
  CONTEXT_CREATED,
  CONTEXT_EDIT,
  CONTEXT_UPDATED,
  CONTEXT_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getContexts = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/contexts?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
 
  if(response.status === 200){
    dispatch({
      type: CONTEXT_LIST, 
      payload: {
        statusCode: response.status,
        contexts: response.data.contexts,
        total_contexts: response.data.total_contexts,
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

export const createContext = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/contexts', {context: formValues}
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
      type: CONTEXT_CREATED, 
      payload: {
        context: response.data.context,
        contexts: response.data.contexts,
        total_contexts: response.data.total_contexts,
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

export const editContext = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/contexts/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response && response.status === 200){
    dispatch({
      type: CONTEXT_EDIT, 
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

export const updateContext = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/contexts/${id}`, {context: form}
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
      type: CONTEXT_UPDATED, 
      payload: {
        context: response.data.context,
        contexts: response.data.contexts,
        total_contexts: response.data.total_contexts,
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

export const deleteContext = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/contexts/${id}`
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
      type: CONTEXT_DELETED,
      payload: {
        context: response.data.context,
        contexts: response.data.contexts,
        total_contexts: response.data.total_contexts,
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
