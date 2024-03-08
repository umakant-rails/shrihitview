import baseUrl from "../services/AxiosService";
import { 
  HOME_PAGE,
  SET_MESSAGE
} from "../utils/types";

export const getHomePageData = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/home', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: HOME_PAGE, 
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

export const getFooterData = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/home/get_footer_data', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: HOME_PAGE, 
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