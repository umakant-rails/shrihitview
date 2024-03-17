import baseUrl from "../../services/AxiosService";
import {
  PB_CONTEXT_LIST,
  PB_CONTEXT_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getContexts = () => async dispatch => {
 
  const response = await baseUrl.get(
    '/pb/contexts', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_CONTEXT_LIST, 
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

export const getContextArticles = (name, page) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/contexts/${name}?page=${page}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_CONTEXT_SHOW, 
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