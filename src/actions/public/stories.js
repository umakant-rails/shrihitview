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
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: PB_STORY_LIST, 
      payload: {
        stories: response.data.stories,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
  // return Promise.resolve(response.data);
};

export const getStory = (id) => async(dispatch) => {
  const response = await baseUrl.get(
    `/pb/stories/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: PB_STORY_SHOW, 
      payload: {
        statusCode: response.status,
        story: response.data.story,
        stories: response.data.stories,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }

}