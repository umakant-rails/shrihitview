import baseUrl from "../../services/AxiosService";
import {
  STORY_LIST,
  STORY_NEW,
  STORY_SHOW,
  STORY_CREATED,
  STORY_EDIT,
  STORY_UPDATED,
  STORY_DELETED,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getStories = (searchAttr) => async dispatch => {
  const arr = Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      return `${key}=${searchAttr[key]}`;
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/stories?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_LIST));
}

export const getStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_SHOW));
}

export const createStory = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/stories', {story: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_CREATED));
}

export const newStory = () => async dispatch => {
  const response = await baseUrl.get(
    '/stories/new', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_NEW));
}

export const editStory = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/stories/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_EDIT));
}

export const updateStory = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/stories/${id}`, {story: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_UPDATED));
}

export const deleteStory = (id, origin_page) => async dispatch => {

  const response = await baseUrl.delete(
    `/stories/${id}?origin_page=${origin_page}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, STORY_DELETED));
}
