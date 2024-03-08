import baseUrl from "../../services/AxiosService";
import {
  PB_SCRIPTURE_LIST,
  PB_SCRIPTURE_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getScriptures = () => async dispatch => {
  const  response = await baseUrl.get(
    "/pb/scriptures",
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.errors === undefined){
    dispatch({
      type: PB_SCRIPTURE_LIST,
      payload: {
        statusCode: response.status,
        scriptures: response.data.scriptures,
      }
    })
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const getScrArticles = (name) => async dispatch => {
  const  response = await baseUrl.get(
    `/pb/scriptures/${name}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: PB_SCRIPTURE_SHOW,
      payload: {
        statusCode: response.status,
        scripture: response.data.scripture,
        articles: response.data.articles
      }
    })
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}