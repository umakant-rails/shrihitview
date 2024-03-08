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
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: PB_CONTEXT_LIST, 
      payload: {
        statusCode: response.status,
        contexts: response.data.contexts,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
  // return Promise.resolve(response.data);
};

export const getContext = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/contexts/${name}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: PB_CONTEXT_SHOW, 
      payload: {
        statusCode: response.status,
        context: response.data.context,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
};