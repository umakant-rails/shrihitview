import baseUrl from "../../services/AxiosService";
import {
  ARTICLE_NEW,
  ARTICLE_CREATED,
  ARTICLE_LIST,
  ARTICLE_TAG_CREATED,
  SET_MESSAGE,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_DELETED,
  ARTICLE_LIST_BY_PAGE,
} from "../../utils/types";

export const newArticle = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles/new', 
  ).then(response => {
    return response;
  });

  if(response && response.data.error === undefined){
    dispatch({
      type: ARTICLE_NEW, 
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

export const createArticle = (form) => async dispatch => {
  const response = await baseUrl.post(
    '/articles', {article: form}
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
      type: ARTICLE_CREATED, 
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

export const editArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}?action_type=edit`,
  ).then(response => {
    return response;
  });

  if(response && response.data.error === undefined){
    dispatch({
      type: ARTICLE_EDIT, 
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

export const updateArticle = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/articles/${id}`, {article: form}
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
      type: ARTICLE_UPDATED, 
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

export const deleteArticle = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/articles/${id}`
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
      type: ARTICLE_DELETED, 
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

export const createTag = (tag) => async dispatch => {
  const response = await baseUrl.post(
    '/tags', {tag: {name: tag}}
  ).then(response => {
    return response;
  });
 
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.status,
    });
    dispatch({
      type: ARTICLE_TAG_CREATED, 
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

export const getArticles = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles',
  ).then(response => {
    return response;
  });
  
  if(response.data.error === undefined){
     dispatch({
      type: ARTICLE_LIST, 
      payload: response.data,
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}

export const getArticlesByPage = (searchAttr, page) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');
  
  const response = await baseUrl.get(
    `/articles/pages/${page}?${searchAttrStr}`,
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
     dispatch({
      type: ARTICLE_LIST_BY_PAGE, 
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

export const getArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}`,
  ).then(response => {
    return response;
  });
  
  if(response.data.error === undefined){
     dispatch({
      type: ARTICLE_SHOW, 
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