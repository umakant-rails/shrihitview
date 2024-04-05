import baseUrl from "../../services/AxiosService";
import {
  CS_ARTICLE_ADD_PAGE,
  CS_FILTERED_ARTICLE,
  CS_ARTICLE_ADD,
  CS_ARTICLE_REMOVE,
  CS_SCRIPTURE_SHOW,
  CS_ARTICLE_FOR_INDEXING,
  CS_ARTICLE_INDEX_UPDATED,
  CS_ARTICLE_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAddArticlePageData = (scripture_id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/add_articles_page`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_ADD_PAGE));
}

export const getFilteredAritcles = (scripture_id, searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/filter_articles?${searchAttrStr}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_FILTERED_ARTICLE));
}

export const addArticleInCS = (scripture_id, article_id, searchAttrs) => async dispatch => {
  searchAttrs.cs_article = {
    article_id: article_id,
    scripture_id: scripture_id,
    chapter_id: searchAttrs.chapter_id,
  }
  const response = await baseUrl.post(
    `/admin/compiled_scriptures/${scripture_id}/add_article`, searchAttrs      
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_ADD));
}

export const removeArticleFromCS = (scripture_id, article_id, searchAttrs) => async dispatch => {
  searchAttrs.cs_article_id = article_id;
  const response = await baseUrl.post(
    `/admin/compiled_scriptures/${scripture_id}/remove_article`, searchAttrs,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_REMOVE));
}

export const showCSScripture = (scripture_id, searchAttrs) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_SCRIPTURE_SHOW));
}

export const getArticleForIndexing = (scripture_id, searchAttrs) => async dispatch => {

  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`;
    }
  })
  const searchAttrsStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/get_articles_for_indexing?${searchAttrsStr}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_FOR_INDEXING));
}

export const updateIndex = (scripture_id, params) => async dispatch => {
 
  const response = await baseUrl.put(
    `/admin/compiled_scriptures/${scripture_id}/update_index`,
    params,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_INDEX_UPDATED));
}

export const deleteCSArticle = (scripture_id, params) => async dispatch => {
   const response = await baseUrl.post(
    `/admin/compiled_scriptures/${scripture_id}/delete_article`,
    params,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, CS_ARTICLE_DELETED));
}