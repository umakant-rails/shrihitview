import baseUrl from "../../services/AxiosService";
import {
  PB_STROTUM_LIST,
  PB_STROTUM_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getStrota = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/strota', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_STROTUM_LIST));
};

export const getStrotum = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/strota/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_STROTUM_SHOW));
}