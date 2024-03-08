import baseUrl from "../../services/AxiosService";
import {
  PB_STORY_LIST,
  PB_STORY_SHOW,
  SET_MESSAGE
} from "../../utils/types";

export const getStories = () => async dispatch => {
  // let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/stories', 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_STORY_LIST, 
      payload: response.data
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
  // return Promise.resolve(response.data);
};

export const getStory = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/stories/${id}`, 
  ).then(response => {
    return response;
  });

  if(response.data.error === undefined){
    dispatch({
      type: PB_STORY_SHOW, 
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