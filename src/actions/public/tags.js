import baseUrl from "../../services/AxiosService";
import {
  PB_TAG_LIST,
  PB_TAG_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getTags = () => async dispatch => {
 
  const response = await baseUrl.get(
    '/pb/tags', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_TAG_LIST, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
};

export const getTagArticles = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/tags/${name}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_TAG_SHOW, 
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