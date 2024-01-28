import baseUrl from "../../services/AxiosService";
import {
    CONTEXT_LIST,
    CONTEXT_SHOW,
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

  if(response.status === 200){
    dispatch({
      type: CONTEXT_LIST, 
      payload: {
        statusCode: response.status,
        contexts: response.data.contexts,
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

export const getContext = (name) => async dispatch => {
 
  const response = await baseUrl.get(
    `/pb/contexts/${name}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: CONTEXT_SHOW, 
      payload: {
        statusCode: response.status,
        context: response.data.context,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
    });
  }
};