import baseUrl from "../services/AxiosService";
import { 
  HOME_PAGE
} from "../utils/types";
import dataDispatchToReducer from "./shared_action";

export const getHomePageData = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/home', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, HOME_PAGE));
};

export const getFooterData = () => async dispatch => {
  const response = await baseUrl.get(
    '/pb/home/get_footer_data', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, HOME_PAGE));
}