import {
  STORY_LIST,
  STORY_SHOW,
} from "../utils/types";

const initialState = {stories: []};

const storyReducer = (state=initialState, action) => {
  switch (action.type) {
    case STORY_LIST:
      return {
        ...state,
        stories: action.payload.stories,
      };
    case STORY_SHOW:
      return {
        ...state,
        story: action.payload.story,
        stories: action.payload.stories,
      };
    default: 
      return state
  }
};

export default storyReducer;