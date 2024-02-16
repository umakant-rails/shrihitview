import baseUrl from "../../services/AxiosService";
import {
  AUTHOR_LIST,
  SET_MESSAGE
} from "../../utils/types";

export const getAuthors = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/authors?${searchAttrStr}`, 
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
        total_authors: response.data.total_authors,
        current_page: response.data.page
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
