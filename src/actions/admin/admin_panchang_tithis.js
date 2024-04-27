import baseUrl from "../../services/AxiosService";
import {
  PANCHANG_TITHI_NEW,
  PANCHANG_LIST,
  PANCHANG_TITHI_CREATED,
  NAVIGATE_MONTH,
  PANCHANG_TITHI_EDITING_DATA,
  PANCHANG_TITHI_UPDATED,
  PANCHANG_TITHI_DELETED,

} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const newPanchangTithi = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}/panchang_tithis/new`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  return response;
}

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

export const getEditingData = (id, date) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}/panchang_tithis/get_editing_data`,{params: {date: date} },
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_TITHI_EDITING_DATA));
}
export const updatePanchangTithi = (id, panchangId, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/panchangs/${id}/panchang_tithis/${panchangId}`, {panchang_tithi: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_TITHI_UPDATED));
}

export const deletePanchangTithi = (id, panchangId) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/panchangs/${id}/panchang_tithis/${panchangId}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_TITHI_DELETED));
}