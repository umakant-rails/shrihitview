import {
  TAG_LIST,
  TAG_CREATED,
  TAG_UPDATED,
  TAG_DELETED,
} from "../../utils/types";
  
const initialState = {tags: []};

const userTagReducer = (state=initialState, action) => {
  switch (action.type) {
    case TAG_LIST:
      return {
        tags: action.payload.tags,
        total_tags: action.payload.total_tags,
        current_page: action.payload.current_page
      };
    case TAG_CREATED:
      return {
        ...state,
        tag: action.payload.tag,
        tags: action.payload.tags,
        total_tags: action.payload.total_tags,
        current_page: action.payload.current_page,
      }
    case TAG_UPDATED:
      return {
        ...state,
        tag: action.payload.tag,
        tags: action.payload.tags,
        total_tags: action.payload.total_tags,
        current_page: action.payload.current_page, 
      }
    case TAG_DELETED:
      return{
        ...state,
        tag: action.payload.tag,
        tags: action.payload.tags,
        total_tags: action.payload.total_tags,
        current_page: action.payload.current_page,
      }
    default: 
      return state
  }
};

export default userTagReducer;