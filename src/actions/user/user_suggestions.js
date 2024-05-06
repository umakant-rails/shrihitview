import baseUrl from "../../services/AxiosService";
import {
  SUGGESTION_CREATED,
  SUGGESTION_DELETED,
  SUGGESTION_LIST,
  SUGGESTION_SHOW,
  SUGGESTION_UPDATED
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getUserSuggestions = (page) => async dispatch => {
  const response = await baseUrl.get(
    `/suggestions?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SUGGESTION_LIST));
};

export const getUserSuggestion = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/suggestions/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SUGGESTION_SHOW));
}

export const createUserSuggestion = (form) => async(dispatch) => {
  const response = await baseUrl.post(
    `/suggestions`, {suggestion: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SUGGESTION_CREATED));
}

export const updateUserSuggestion = (id, form) => async(dispatch) => {
  const response = await baseUrl.put(
    `/suggestions/${id}`, {suggestion: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SUGGESTION_UPDATED));
}

export const deleteUserSuggestion = (id) => async(dispatch) => {
  const response = await baseUrl.delete(
    `/suggestions/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, SUGGESTION_DELETED));
}