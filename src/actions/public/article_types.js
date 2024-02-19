import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_TYPE_LIST,
  PB_ARTICLE_TYPE_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getArticleTypes = () => async dispatch => {
 
  const response = await baseUrl.get(
    '/pb/article_types', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: PB_ARTICLE_TYPE_LIST, 
      payload: {
        statusCode: response.status,
        article_types: response.data.article_types,
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

export const getArticleType = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/article_types/${name}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: PB_ARTICLE_TYPE_SHOW, 
      payload: {
        statusCode: response.status,
        article_type: response.data.article_type,
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