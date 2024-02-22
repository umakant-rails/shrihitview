import baseUrl from "../../services/AxiosService";
import {
  STROTUM_LIST,
  STROTUM_NEW,
  STROTUM_CREATED,
  STROTUM_SHOW,
  STROTUM_EDIT,
  STROTUM_UPDATED,
  STROTUM_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getStrota = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/strota?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: STROTUM_LIST, 
      payload: {
        statusCode: response.status,
        strota: response.data.strota,
        strota_types: response.data.strota_types,
        total_strota: response.data.total_strota,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const getStrotum = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/strota/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: STROTUM_SHOW, 
      payload: {
        statusCode: response.status,
        strotum: response.data.strotum,
        strotum_articles: response.data.strotum_articles,
        article_types: response.data.article_types,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const createStrotum = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/strota', {strotum: formValues}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: STROTUM_CREATED, 
      payload: {
        statusCode: response.status,
        strotum: response.data.strotum,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const newStrotum = () => async dispatch => {
  const response = await baseUrl.get(
    '/admin/strota/new', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: STROTUM_NEW, 
      payload: {
        statusCode: response.status,
        strota_types: response.data.strota_types,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const editStrotum = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/strota/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: STROTUM_EDIT, 
      payload: {
        statusCode: response.status,
        strotum: response.data.strotum,
        strota_types: response.data.strota_types,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const updateStrotum = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/strota/${id}`, {strotum: form}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: STROTUM_UPDATED, 
      payload: {
        updatedStrotum: response.data.strotum,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const deleteStrotum = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/strota/${id}`
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: STROTUM_DELETED,
      payload: {
        deletedStrotum: response.data.strotum,
        strota: response.data.strota,
        total_strota: response.data.total_strota,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const getStrotumArticles =(id, page) => async dispatch => {

}

export const deleteStrotumArticle =(id) => async dispatch => {

}