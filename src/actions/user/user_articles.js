import baseUrl from "../../services/AxiosService";
import {
  ARTICLE_NEW,
  ARTICLE_CREATED,
  ARTICLE_LIST,
  ARTICLE_TAG_CREATED,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_DELETED,
  ARTICLE_LIST_BY_PAGE,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const newArticle = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles/new', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_NEW));
}

export const createArticle = (form) => async dispatch => {
  const response = await baseUrl.post(
    '/articles', {article: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_CREATED));
}

export const editArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}?action_type=edit`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_EDIT));
}

export const updateArticle = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/articles/${id}`, {article: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_UPDATED));
}

export const deleteArticle = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/articles/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_DELETED));
}

export const createTag = (tag) => async dispatch => {
  const response = await baseUrl.post(
    '/tags', {tag: {name: tag}}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_TAG_CREATED));
}

export const getArticles = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles',
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_LIST));
}

export const getArticlesByPage = (searchAttr, page) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      return `${key}=${searchAttr[key]}`;
    }
  })
  const searchAttrStr = arr.join('&');
  
  const response = await baseUrl.get(
    `/articles/pages/${page}?${searchAttrStr}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_LIST_BY_PAGE));
}

export const getArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ARTICLE_SHOW));
}