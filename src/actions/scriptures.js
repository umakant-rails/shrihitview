import baseUrl from "../services/AxiosService";
import {
  SCRIPTURE_LIST,
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