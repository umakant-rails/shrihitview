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
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: PB_SCRIPTURE_LIST,
      payload: response.data
    })
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const getScrArticles = (name) => async dispatch => {
  const  response = await baseUrl.get(
    `/pb/scriptures/${name}`,
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_SCRIPTURE_SHOW,
      payload: response.data
    })
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}