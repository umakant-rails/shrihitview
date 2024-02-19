import {
  TAG_LIST,
  TAG_CREATED,
  TAG_EDIT,
  TAG_UPDATED,
  TAG_DELETED,
  SET_MESSAGE,
} from "../../utils/types";
  
  const initialState = {tags: []};
  
  const adminTagReducer = (state=initialState, action) => {
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
  
  export default adminTagReducer;