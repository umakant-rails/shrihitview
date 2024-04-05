import baseUrl from "../../services/AxiosService";
import {
  SCRIPTURE_CREATED,
  SCRIPTURE_DELETED,
  SCRIPTURE_LIST,
  SCRIPTURE_NEW,
  SCRIPTURE_EDIT,
  SCRIPTURE_UPDATED,
  SCRIPTURE_SHOW,
  SCR_CHAPTER_ARTICLES,
  SCR_ARTICLE_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getScriptures = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/scriptures?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_LIST));
}

export const getScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_SHOW));
}

export const newScripture = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/new`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_NEW));
}

export const createScripture = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures`, {scripture: formValues} 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_CREATED));
}

export const editScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_EDIT));
}

export const updateScripture = (id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${id}`, {scripture: formValues},
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_UPDATED));
}

export const deleteScripture = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCRIPTURE_DELETED));
}

export const getChapterArticles = (scripture_id, searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key => {
    let str = `${searchAttr[key]}`
    if(str.length > 0){
      return `${key}=${searchAttr[key]}`
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles?${searchAttrStr}` 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_CHAPTER_ARTICLES));
}

export const deleteScrArticle = (scripture_id, article_id, searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key => {
    let str = `${searchAttr[key]}`
    if(str.length > 0){
      return `${key}=${searchAttr[key]}`
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.delete(
    `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_ARTICLE_DELETED));
}
