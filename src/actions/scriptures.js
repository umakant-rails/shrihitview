import baseUrl from "../services/AxiosService";
import {
  SCRIPTURE_LIST,
  SCRIPTURE_SHOW,
  SET_MESSAGE
} from "../utils/types";

export const getScriptures = () => async dispatch => {
  const  response = await baseUrl.get(
    "/pb/scriptures",
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
    dispatch({
      type: SCRIPTURE_LIST,
      payload: {
        statusCode: response.status,
        scriptures: response.data.scriptures,
      }
    })
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.status.message,
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
  console.log(response)
  if(response.status === 200){
    dispatch({
      type: SCRIPTURE_SHOW,
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
      payload: response.data.status.message,
    });
  }
}