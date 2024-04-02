import baseUrl from "../../services/AxiosService";
import {
  ADMIN_ARTICLE_LIST,
  ADMIN_ARTICLES_BY_PAGE,
  ADMIN_ARTICLE_APPROVED,
  ADMIN_ARTICLE_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getAdminArticles = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/articles`,
  ).then(response => { 
    return response;
  }).catch(error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_ARTICLE_LIST));
}

export const getArticlesByPage = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/articles/articles_by_page?${searchAttrStr}`,
  ).then(response => {
    return response;
  }).catch(error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_ARTICLES_BY_PAGE));
}

export const approveArticle = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/articles/${id}/article_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_ARTICLE_APPROVED));
}

export const deleteAdminArticle = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/articles/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, ADMIN_ARTICLE_DELETED));
}