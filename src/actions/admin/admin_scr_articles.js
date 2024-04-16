import baseUrl from "../../services/AxiosService";
import {
  SCR_ARTICLE_NEW,
  SCR_ARTICLE_CREATED,
  SCR_ARTICLE_EDIT,
  SCR_ARTICLE_UPDATED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const newScrArticle = (scripture_id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles/new`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_ARTICLE_NEW));
}

export const getScrArticle = (scripture_id, id) => async dispatch => {

  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/scripture_articles/${id}` 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_ARTICLE_EDIT));
}

export const createScrArticle = (scripture_id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures/${scripture_id}/scripture_articles`, {scripture_article: formValues} 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_ARTICLE_CREATED));
}

export const updateScrArticle = (scripture_id, article_id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}`, {scripture_article: formValues} 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SCR_ARTICLE_UPDATED));
}

