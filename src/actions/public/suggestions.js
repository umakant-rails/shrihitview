import baseUrl from "../../services/AxiosService";
import {
  PB_SUGGESTION_CREATED,
  PB_SUGGESTION_LIST,
  PB_SUGGESTION_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getSuggestions = (page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/suggestions?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SUGGESTION_LIST));
};

export const getSuggestion = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/suggestions/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SUGGESTION_SHOW));
}

export const createSuggestion = (form) => async(dispatch) => {
  const response = await baseUrl.post(
    `/pb/suggestions`, {suggestion: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SUGGESTION_CREATED));
}