import baseUrl from "../../services/AxiosService";
import {
  PANCHANG_TITHI_NEW,
  PANCHANG_LIST,
  PANCHANG_TITHI_CREATED,
  NAVIGATE_MONTH,

} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const newPanchangTithi = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}/panchang_tithis/new`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_TITHI_NEW));
}

// export const getPanchang = (id) => async dispatch => {
//   const response = await baseUrl.get(
//     `/admin/panchangs/${id}`, 
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_SHOW));
// }

export const createPanchangTithi = (id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/panchangs/${id}/panchang_tithis`, {panchang_tithi: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_TITHI_CREATED));
}

export const navigateMonth = (id, date) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}/panchang_tithis/navigate`,{params: {date: date} },
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, NAVIGATE_MONTH));
}
// export const updatePanchang = (id, form) => async dispatch => {
//   const response = await baseUrl.put(
//     `/admin/panchangs/${id}`, {panchang: form}
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_UPDATED));
// }

// export const deletePanchang = (id) => async dispatch => {
//   const response = await baseUrl.delete(
//     `/admin/panchangs/${id}`
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_DELETED));
// }