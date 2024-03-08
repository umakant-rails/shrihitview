import baseUrl from "../../services/AxiosService";
import {
  CHAPTER_LIST,
  SCR_ARTICLE_NEW,
  SCR_ARTICLE_CREATED,
  SCR_ARTICLE_EDIT,
  SCR_ARTICLE_UPDATED,
  SCR_ARTICLE_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const newScrArticle = (scripture_id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles/new`,
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
      type: SCR_ARTICLE_NEW,
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

export const getScrArticle = (scripture_id, id) => async dispatch => {

  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles/${id}` 
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
      type: SCR_ARTICLE_EDIT, 
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

export const createScrArticle = (scripture_id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures/${scripture_id}/scripture_articles`, {scripture_article: formValues} 
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
      type: SCR_ARTICLE_CREATED, 
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

export const updateScrArticle = (scripture_id, article_id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}`, {scripture_article: formValues} 
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
      type: SCR_ARTICLE_UPDATED, 
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

