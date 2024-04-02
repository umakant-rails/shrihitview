import baseUrl from "../../services/AxiosService";
import {
  PB_SCRIPTURE_LIST,
  PB_SCRIPTURE_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getScriptures = () => async dispatch => {
  const  response = await baseUrl.get(
    "/pb/scriptures",
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SCRIPTURE_LIST));
}

export const getScrArticles = (name) => async dispatch => {
  const  response = await baseUrl.get(
    `/pb/scriptures/${name}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_SCRIPTURE_SHOW));
}