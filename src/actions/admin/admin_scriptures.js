import baseUrl from "../../services/AxiosService";
import {
  SCRIPTURE_CREATED,
  SCRIPTURE_DELETED,
  SCRIPTURE_LIST,
  SCRIPTURE_NEW,
  SCRIPTURE_EDIT,
  SCRIPTURE_UPDATED,
  SET_MESSAGE,
  SCRIPTURE_SHOW,
  SCR_CHAPTER_ARTICLES,
  SCR_ARTICLE_DELETED,
} from "../../utils/types";

export const getScriptures = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/scriptures?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_LIST, 
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

export const getScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_SHOW, 
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

export const newScripture = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/new`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_NEW, 
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

export const createScripture = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures`, {scripture: formValues} 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_CREATED, 
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

export const editScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_EDIT, 
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

export const updateScripture = (id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${id}`, {scripture: formValues},
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_UPDATED, 
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

export const deleteScripture = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SCRIPTURE_DELETED, 
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

export const getChapterArticles = (scripture_id, searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key => {
    let str = `${searchAttr[key]}`
    if(str.length > 0){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles?${searchAttrStr}` 
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
      type: SCR_CHAPTER_ARTICLES,
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
      // payload: response.data.status.message,
    });
  }
}

export const deleteScrArticle = (scripture_id, article_id, searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    let str = `${searchAttr[key]}`
    if(str.length > 0){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.delete(
    `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}?${searchAttrStr}`, 
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
      type: SCR_ARTICLE_DELETED, 
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
