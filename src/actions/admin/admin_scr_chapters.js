import baseUrl from "../../services/AxiosService";
import {
  CHAPTER_LIST,
  CHAPTER_CREATED,
  CHAPTER_UPDATED,
  CHAPTER_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getChapters = (scripture_id, searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  })
  const searchAttrStr = arr.join('&');
  
  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/chapters?${searchAttrStr}` 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CHAPTER_LIST));
}

export const createChapter = (scripture_id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures/${scripture_id}/chapters`, {chapter: formValues} 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CHAPTER_CREATED));
}

export const updateChapter = (scripture_id, chapter_id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, {chapter: formValues} 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CHAPTER_UPDATED));
}

export const deleteChapter = (scripture_id, chapter_id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CHAPTER_DELETED));
}