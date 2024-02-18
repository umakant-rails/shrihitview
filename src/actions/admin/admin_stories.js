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
  }).catch(function (error) {
    return error.response;
  });
  if(response.status === 200){
    dispatch({
      type: STORY_LIST, 
      payload: {
        stories: response.data.stories,
        total_stories: response.data.total_stories,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const getStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: STORY_SHOW, 
      payload: {
        story: response.data.story,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const createStory = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/stories', {story: formValues}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response && response.status === 200){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: STORY_CREATED, 
      payload: {
        statusCode: response.status,
        story: response.data.story
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const newStory = () => async dispatch => {
  const response = await baseUrl.get(
    '/stories/new', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response && response.status === 200){
    dispatch({
      type: STORY_NEW, 
      payload: {
        statusCode: response.status,
        sants: response.data.sants,
        scriptures: response.data.scriptures,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const editStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response && response.status === 200){
    dispatch({
      type: STORY_EDIT, 
      payload: {
        sants: response.data.sants,
        scriptures: response.data.scriptures,
        story: response.data.story,
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const updateStory = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/stories/${id}`, {story: form}
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
      type: STORY_UPDATED, 
      payload: {
        storyUpdated: response.data.story,
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

export const deleteStory = (id, origin_page) => async dispatch => {

  const response = await baseUrl.delete(
    `/stories/${id}?origin_page=${origin_page}`
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
      type: STORY_DELETED,
      payload: {
        stories: response.data.stories,
        total_stories: response.data.total_stories,
        current_page: response.data.current_page,
        storyDeleted: response.data.story
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
