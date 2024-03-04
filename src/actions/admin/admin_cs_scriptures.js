import baseUrl from "../../services/AxiosService";
import {
  CS_ARTICLE_ADD_PAGE,
  CS_FILTERED_ARTICLE,
  CS_ARTICLE_ADD,
  SET_MESSAGE,
  CS_ARTICLE_REMOVE,
} from "../../utils/types";

export const getAddArticlePageData = (scripture_id) => async dispatch => {
  // const arr = [];
  // Object.keys(searchAttrs).map( key =>{
  //   if(searchAttrs[key]){
  //     arr.push(`${key}=${searchAttrs[key]}`)
  //   }
  // })
  // const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/add_articles_page`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
     dispatch({
      type: CS_ARTICLE_ADD_PAGE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}

export const getFilteredAritcles = (scripture_id, searchAttrs) => async dispatch => {
  const arr = [];
  Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      arr.push(`${key}=${searchAttrs[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/filter_articles?${searchAttrStr}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
console.log(response)
  if(response.status === 200){
     dispatch({
      type: CS_FILTERED_ARTICLE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
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
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
     dispatch({
      type: CS_ARTICLE_ADD, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}

export const removeArticleFromCS = (scripture_id, article_id, searchAttrs) => async dispatch => {
  searchAttrs.cs_article_id = article_id;
  const response = await baseUrl.post(
    `/admin/compiled_scriptures/${scripture_id}/remove_article`, searchAttrs,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
     dispatch({
      type: CS_ARTICLE_REMOVE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}