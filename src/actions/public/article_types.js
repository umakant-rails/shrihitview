import baseUrl from "../../services/AxiosService";
import {
  PB_ARTICLE_TYPE_LIST,
  PB_ARTICLE_TYPE_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getArticleTypes = (page) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/article_types?page=${page}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_ARTICLE_TYPE_LIST, 
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

export const getArticleTypeArticles = (name, page) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/article_types/${name}?page=${page}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_ARTICLE_TYPE_SHOW, 
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