import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_LIST,
  ARTICLE_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getArticles = () => async dispatch => {
  // let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/articles', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: PB_ARTICLE_LIST, 
      payload: {
        statusCode: response.status,
        articles: response.data.articles,
        authors: response.data.authors,
        tags: response.data.tags,
        contexts: response.data.contexts,
        article_types: response.data.article_types
        // message: response.data.status.message
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
  // return Promise.resolve(response.data);
};

export const getArticle = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/articles/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: ARTICLE_SHOW, 
      payload: {
        statusCode: response.status,
        article: response.data.article,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.status.message,
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
