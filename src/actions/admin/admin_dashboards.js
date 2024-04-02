import baseUrl from "../../services/AxiosService";
import {
  DASHBOARD_DATA
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getDashboardData = (WWW) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/dashboards`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, DASHBOARD_DATA));
}

