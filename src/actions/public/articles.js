import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_LIST,
  PB_ARTICLE_BY_PAGE,
  PB_ARTICLE_SHOW,
  SET_MESSAGE
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getArticles = () => async dispatch => { 
  const response = await baseUrl.get(
    `/pb/articles`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_ARTICLE_LIST));
};

export const getArticlesByPage = (page) => async dispatch => { 
  const response = await baseUrl.get(
    `/pb/articles?page=${page}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_ARTICLE_BY_PAGE));
};


export const getArticle = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/articles/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_ARTICLE_SHOW));
}

export const searchToArticles = (term, page) => async(dispatch) => {
  const response = await baseUrl.get(
    '/pb/articles/search_articles', 
    {params: {term: term, page: page}}
    ).then(response => {
    return response;
  }).catch(function (error) {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: 'Some Error has occured. Please try again.'});
    return {data: {articles: []}};
  });
  return response;
}
