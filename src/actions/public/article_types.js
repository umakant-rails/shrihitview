import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_TYPE_LIST,
  PB_ARTICLE_TYPE_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getArticleTypes = (page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/article_types?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_ARTICLE_TYPE_LIST));
};

export const getArticleTypeArticles = (name, page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/article_types/${name}?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_ARTICLE_TYPE_SHOW));
  // return Promise.resolve(response.data);
};