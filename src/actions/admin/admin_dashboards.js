import baseUrl from "../../services/AxiosService";
import {
  DASHBOARD_DATA  ,
  SET_MESSAGE,
} from "../../utils/types";

export const getDashboardData = (WWW) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/dashboards`, 
  ).then(response => {
    return response;
  });
 
  if(response.data.error === undefined){
    dispatch({
      type: DASHBOARD_DATA, 
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

