import baseUrl from "../services/AxiosService";
import {
  ARTICLE_NEW,
  SET_MESSAGE
} from "../utils/types";

export const newArticle = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles/new', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: ARTICLE_NEW, 
      payload: {
        statusCode: response.status,
        article_types: response.data.article_types,
        raags: response.data.raags,
        contexts: response.data.contexts,
        authors: response.data.authors,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
    });
  }
}


export const AddArticle = () => async dispatch => {

}
