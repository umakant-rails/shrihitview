import baseUrl from "../../services/AxiosService";
import {
  PANCHANG_CREATED,
  PANCHANG_DELETED,
  PANCHANG_LIST,
  PANCHANG_SHOW,
  PANCHANG_UPDATED
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getPanchangs = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_LIST));
}

export const getPanchang = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_SHOW));
}

export const createPanchang = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    '/admin/panchangs', {panchang: formValues}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_CREATED));

}

export const updatePanchang = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/panchangs/${id}`, {panchang: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_UPDATED));
}

export const deletePanchang = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/panchangs/${id}`
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PANCHANG_DELETED));
}