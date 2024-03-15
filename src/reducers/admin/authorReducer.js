import {
  ADMIN_AUTHOR_LIST,
  ADMIN_AUTHOR_APPROVED,
  ADMIN_AUTHOR_DELETED,
 
} from "../../utils/types";
  
  const initialState = {authors: []};
  
  const adminAuthorReducer = (state=initialState, action) => {
    switch (action.type) {
      case ADMIN_AUTHOR_LIST:
        return {
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
          current_page: action.payload.current_page
        };
      case ADMIN_AUTHOR_APPROVED:
        return {
          ...state,
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
        }
      case ADMIN_AUTHOR_DELETED:
        return{
          ...state,
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
        }
      default: 
        return state
    }
  };
  
  export default adminAuthorReducer;