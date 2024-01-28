import baseUrl from "../../services/AxiosService";
import {
  TAG_LIST,
  TAG_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getTags = () => async dispatch => {
 
  const response = await baseUrl.get(
    '/pb/tags', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: TAG_LIST, 
      payload: {
        statusCode: response.status,
        tags: response.data.tags,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
    });
  }
};

export const getTag = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/tags/${name}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: TAG_SHOW, 
      payload: {
        statusCode: response.status,
        tags: response.data.tag,
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