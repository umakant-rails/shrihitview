import baseUrl from "../../services/AxiosService";
import {
  CS_ARTICLE_ADD_PAGE,
  CS_FILTERED_ARTICLE,
  CS_ARTICLE_ADD,
  SET_MESSAGE,
  CS_ARTICLE_REMOVE,
  CS_SCRIPTURE_SHOW,
  CS_ARTICLE_FOR_INDEXING,
  CS_ARTICLE_INDEX_UPDATED,
  CS_ARTICLE_DELETED,
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
  
  if(response.data.errors === undefined){
     dispatch({
      type: CS_ARTICLE_ADD_PAGE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const getFilteredAritcles = (scripture_id, searchAttrs) => async dispatch => {
  const arr = [];
  Object.keys(searchAttrs).map( key => {
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

  if(response.data.errors === undefined){
     dispatch({
      type: CS_FILTERED_ARTICLE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
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
  
  if(response.data.errors === undefined){
     dispatch({
      type: CS_ARTICLE_ADD, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
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
  
  if(response.data.errors === undefined){
     dispatch({
      type: CS_ARTICLE_REMOVE, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const showCSScripture = (scripture_id, searchAttrs) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
     dispatch({
      type: CS_SCRIPTURE_SHOW, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }

}

export const getArticleForIndexing = (scripture_id, searchAttrs) => async dispatch => {
  const arr = [];
  Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      arr.push(`${key}=${searchAttrs[key]}`)
    }
  })
  const searchAttrsStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/compiled_scriptures/${scripture_id}/get_articles_for_indexing?${searchAttrsStr}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
     dispatch({
      type: CS_ARTICLE_FOR_INDEXING, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const updateIndex = (scripture_id, params) => async dispatch => {
 
  const response = await baseUrl.put(
    `/admin/compiled_scriptures/${scripture_id}/update_index`,
    params,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: CS_ARTICLE_INDEX_UPDATED, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const deleteCSArticle = (scripture_id, params) => async dispatch => {
   const response = await baseUrl.post(
    `/admin/compiled_scriptures/${scripture_id}/delete_article`,
    params,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: CS_ARTICLE_DELETED, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}