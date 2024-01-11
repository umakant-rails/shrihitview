import baseUrl from "../services/AxiosService";
import {
    AUTHOR_LIST,
    AUTHOR_SHOW,
    SET_MESSAGE
} from "../utils/types";

export const getAuthors = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/authors', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
    dispatch({
      type: AUTHOR_LIST, 
      payload: {
        statusCode: response.status,
        authors: response.data.authors,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}