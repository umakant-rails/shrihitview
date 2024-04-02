import baseUrl from "../../services/AxiosService";
import {
  STROTUM_LIST,
  STROTUM_NEW,
  STROTUM_CREATED,
  STROTUM_SHOW,
  STROTUM_EDIT,
  STROTUM_UPDATED,
  STROTUM_DELETED,
  STROTUM_ARTICLE_CREATED,
  STROTUM_ARTICLE_UPDATED,
  STROTUM_ARTICLE_DELETED,
  STROTUM_ARTICLE_INDEX_UPDATED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getStrota = (searchAttrs) => async dispatch => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`
    }
  });
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/strota?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_LIST));
}

export const getStrotum = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/strota/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_SHOW));
}

export const createStrotum = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/strota', {strotum: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_CREATED));
}

export const newStrotum = () => async dispatch => {
  const response = await baseUrl.get(
    '/admin/strota/new', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_NEW));
}

export const editStrotum = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/strota/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_EDIT));
}

export const updateStrotum = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/strota/${id}`, {strotum: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_UPDATED));
}

export const deleteStrotum = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/strota/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_DELETED));
}

/* start - actions for strotum's articles */
export const getStrotumArticles =(id, page) => async dispatch => {

}
export const createStrotumArticle =(strotum_id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/strota/${strotum_id}/strota_articles`, {strota_article: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_ARTICLE_CREATED));
}

export const updateStrotumArticle =(strotum_id, article_id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/strota/${strotum_id}/strota_articles/${article_id}`, {strota_article: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_ARTICLE_UPDATED));
}

export const updateAritcleIndex = (strotum_id, article_id, new_index) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/strota/${strotum_id}/strota_articles/${article_id}/update_index`, 
    {new_index: new_index}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_ARTICLE_INDEX_UPDATED));
}

export const deleteStrotumArticle =(strotum_id, article_id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/strota/${strotum_id}/strota_articles/${article_id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STROTUM_ARTICLE_DELETED));
}

/* end - actions for strotum's articles */