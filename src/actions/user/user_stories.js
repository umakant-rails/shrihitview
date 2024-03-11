import baseUrl from "../../services/AxiosService";
import {
  STORY_LIST,
  STORY_NEW,
  STORY_SHOW,
  STORY_CREATED,
  STORY_EDIT,
  STORY_UPDATED,
  STORY_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getStories = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/stories?${searchAttrStr}`, 
  ).then(response => {
    return response;
  });
  if(response.data.error === undefined){
    dispatch({
      type: STORY_LIST, 
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

export const getStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: STORY_SHOW, 
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

export const createStory = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/stories', {story: formValues}
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
      type: STORY_CREATED, 
      payload: response.data
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const newStory = () => async dispatch => {
  const response = await baseUrl.get(
    '/stories/new', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: STORY_NEW, 
      payload: response.data
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const editStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: STORY_EDIT, 
      payload: response.data
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const updateStory = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/stories/${id}`, {story: form}
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
      type: STORY_UPDATED, 
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

export const deleteStory = (id, origin_page) => async dispatch => {

  const response = await baseUrl.delete(
    `/stories/${id}?origin_page=${origin_page}`
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
      type: STORY_DELETED,
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
