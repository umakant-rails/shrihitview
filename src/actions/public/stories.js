import baseUrl from "../../services/AxiosService";
import {
  PB_STORY_LIST,
  PB_STORY_SHOW
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const getStories = () => async dispatch => {
  // let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/stories', 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_STORY_LIST));
};

export const getStory = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/stories/${id}`, 
  ).then(response => {
    return response;
  }).catch( error => error.response);

  dispatch(dataDispatchToReducer(response, PB_STORY_SHOW));
}