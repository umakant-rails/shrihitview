import baseUrl from "../../services/AxiosService";
import {
  PB_CONTEXT_LIST,
  PB_CONTEXT_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getContexts = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/contexts', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_CONTEXT_LIST));
};

export const getContextArticles = (name, page) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/contexts/${name}?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_CONTEXT_SHOW));
};