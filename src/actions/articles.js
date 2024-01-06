import baseUrl from "../services/AxiosService";
import {
  ARTICLE_LIST,
  SET_MESSAGE
} from "../utils/types";

export const getArticles = () => async dispatch => {
  let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/articles', 
  ).then(response => {
    console.log(response);
    return response;
  }).catch(function (error) {
    return error.response;
  });
  console.log(response)
  if(response.status === 200){
    dispatch({
      type: ARTICLE_LIST, 
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
