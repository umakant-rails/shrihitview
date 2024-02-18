import {
  PB_STORY_LIST,
  PB_STORY_SHOW,
} from "../../utils/types";

const initialState = {stories: []};

const storyReducer = (state=initialState, action) => {
  switch (action.type) {
    case PB_STORY_LIST:
      return {
        ...state,
        stories: action.payload.stories,
      };
    case PB_STORY_SHOW:
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