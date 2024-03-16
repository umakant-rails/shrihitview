import baseUrl from "../../services/AxiosService";
import {
  ADMIN_ARTICLE_LIST,
  ADMIN_ARTICLES_BY_PAGE,
  ADMIN_ARTICLE_APPROVED,
  ADMIN_ARTICLE_DELETED,
  SET_MESSAGE,

  ARTICLE_NEW,
  ARTICLE_CREATED,
  ARTICLE_TAG_CREATED,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_LIST_BY_PAGE,
} from "../../utils/types";

export const getAdminArticles = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/articles`,
  ).then(response => response)
  .catch(error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: ADMIN_ARTICLE_LIST, payload: response.data, });
    } else {
      dispatch({
        type: SET_MESSAGE, msg_type: "error",
        payload: response.data.error.join("\n"),
      });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data});
  }
}

export const getArticlesByPage = (searchAttrs) => async dispatch => {
  const arr = [];
  Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      arr.push(`${key}=${searchAttrs[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/articles/articles_by_page?${searchAttrStr}`,
  ).then(response => {
    return response;
  }).catch(error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: ADMIN_ARTICLES_BY_PAGE, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.statusText});
  }
}

export const approveArticle = (id, searchAttrs) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/articles/${id}/article_approved`, searchAttrs
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_ARTICLE_APPROVED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}

export const deleteAdminArticle = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/articles/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({ type: SET_MESSAGE, msg_type: "success", payload: response.data.notice});
      dispatch({ type: ADMIN_ARTICLE_DELETED, payload: response.data });
    } else {
      dispatch({ type: SET_MESSAGE, msg_type: "error",  payload: response.data.error.join("\n") });
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}


















