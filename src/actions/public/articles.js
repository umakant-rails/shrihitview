import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_LIST,
  PB_ARTICLE_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getArticles = () => async dispatch => {
  // let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/articles', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_ARTICLE_LIST, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
  // return Promise.resolve(response.data);
};

export const getArticle = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/articles/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_ARTICLE_SHOW, 
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

export const searchToArticles = (term) => async(dispatch) => {
  const response = await baseUrl.get('/pb/articles/search_articles', {params: {term: term}});
  // .then(response => {
  //   return response;
  // }).catch(function (error) {
  //   return error.response;
  // }); 
  return Promise.resolve(response.data);
}
