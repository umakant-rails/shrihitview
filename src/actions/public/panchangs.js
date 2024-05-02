import baseUrl from "../../services/AxiosService";
import {
  PB_PANCHANG_LIST,
  PB_PANCHANG_SHOW,
  PB_NAVIGATE_MONTH,
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getPanchangs = () => async dispatch => {
  const response = await baseUrl.get(
    `/pb/panchangs`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_PANCHANG_LIST));
}

export const getPanchang = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/panchangs/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_PANCHANG_SHOW));
}

export const navigateMonth = (id, date) => async dispatch => {
  const response = await baseUrl.get(
    `/pb/panchangs/${id}/navigate`,{params: {date: date} },
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_NAVIGATE_MONTH));
}