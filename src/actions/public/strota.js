import baseUrl from "../../services/AxiosService";
import {
  PB_STROTUM_LIST,
  PB_STROTUM_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getStrota = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/strota', 
  ).then(response => {
    return response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: PB_STROTUM_LIST, 
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

export const getStrotum = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/strota/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_STROTUM_SHOW, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }

}