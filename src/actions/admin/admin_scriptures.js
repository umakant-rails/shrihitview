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
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_LIST, 
      payload: {
        statusCode: response.status,
        scriptures: response.data.scriptures,
        total_scriptures: response.data.total_scriptures,
        scripture_types: response.data.scripture_types,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const getScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_SHOW, 
      payload: {
        scripture: response.data.scripture,
        chapters: response.data.chapters,
        sections: response.data.sections,
        articles: response.data.articles,
        total_articles: response.data.total_articles,
        current_page: response.data.current_page,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const newScripture = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/new`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_NEW, 
      payload: {
        statusCode: response.status,
        scripture_types: response.data.scripture_types,
        authors: response.data.authors,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const createScripture = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures`, {scripture: formValues} 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_CREATED, 
      payload: {
        scriptureCreated: response.data.scripture,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const editScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_EDIT, 
      payload: {
        statusCode: response.status,
        scripture: response.data.scripture,
        scripture_types: response.data.scripture_types,
        authors: response.data.authors
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const updateScripture = (id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${id}`, {scripture: formValues},
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_UPDATED, 
      payload: {
        statusCode: response.status,
        scriptureUpdated: response.data.scripture,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const deleteScripture = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_DELETED, 
      payload: {
        statusCode: response.status,
        scriptures: response.data.scriptures,
        total_scriptures: response.data.total_scriptures,
        scripture_types: response.data.scripture_types,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
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
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: SCR_CHAPTER_ARTICLES,
      payload: {
        articles: response.data.articles,
        total_articles: response.data.total_articles
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
      // payload: response.data.status.message,
    });
  }
}
