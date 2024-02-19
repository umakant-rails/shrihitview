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
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
    dispatch({
      type: PB_STROTUM_LIST, 
      payload: {
        strota: response.data.strota,
        strota_types: response.data.strota_types,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
    });
  }
};

export const getStrotum = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/strota/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: PB_STROTUM_SHOW, 
      payload: {
        statusCode: response.status,
        strotum: response.data.strotum ,
        strota: response.data.strota,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.status.message,
    });
  }

}