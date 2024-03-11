import {
  STORY_LIST,
  STORY_NEW,
  STORY_SHOW,
  STORY_CREATED,
  STORY_EDIT,
  STORY_UPDATED,
  STORY_DELETED,
} from "../../utils/types";
  
const initialState = {stories: []};

const userStoryReducer = (state=initialState, action) => {
  switch (action.type) {
    case STORY_NEW:
      return {
        ...state,
        sants: action.payload.sants,
        scriptures: action.payload.scriptures,
      };
    case STORY_LIST:
      return {
        ...state,
        stories: action.payload.stories,
        total_stories: action.payload.total_stories,
        current_page: action.payload.current_page
      };
    case STORY_SHOW:
      return {
        story: action.payload.story
      };
    case STORY_CREATED:
      return {
        ...state,
        story: action.payload.story
      }
    case STORY_EDIT:
      return {
        sants: action.payload.sants,
        scriptures: action.payload.scriptures,
        story: action.payload.story,
      };
    case STORY_UPDATED:
      return {
        ...state,
        storyUpdated: action.payload.story 
      }
    case STORY_DELETED:
      return{
        ...state,
        stories: action.payload.stories,
        total_stories: action.payload.total_stories,
        storyDeleted: action.payload.story
      }
    default: 
      return state
  }
};

export default userStoryReducer;