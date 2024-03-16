import {
  ADMIN_TAG_LIST,
  ADMIN_TAG_APPROVED,
  ADMIN_TAG_UPDATED,
  ADMIN_TAG_DELETED,
 
} from "../../utils/types";
  
  const initialState = {tags: []};
  
  const adminTagReducer = (state=initialState, action) => {
    switch (action.type) {
      case ADMIN_TAG_LIST:
        return {
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
          current_page: action.payload.current_page
        };
      case ADMIN_TAG_APPROVED:
        return {
          ...state,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
        }
      case ADMIN_TAG_UPDATED:
        return{
          ...state,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
        }
      case ADMIN_TAG_DELETED:
        return{
          ...state,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
        }
      default: 
        return state
    }
  };
  
  export default adminTagReducer;