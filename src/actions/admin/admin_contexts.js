import baseUrl from "../../services/AxiosService";
import {
  CONTEXT_LIST,
  CONTEXT_CREATED,
  CONTEXT_UPDATED,
  CONTEXT_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getContexts = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/contexts?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CONTEXT_LIST));
}

export const createContext = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/contexts', {context: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CONTEXT_CREATED));

}

export const updateContext = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/contexts/${id}`, {context: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CONTEXT_UPDATED));
}

export const deleteContext = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/contexts/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CONTEXT_DELETED));
}
