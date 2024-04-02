import baseUrl from "../../services/AxiosService";
import {
  PB_TAG_LIST,
  PB_TAG_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getTags = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/tags', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_TAG_LIST));
};

export const getTagArticles = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/tags/${name}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_TAG_SHOW));
};