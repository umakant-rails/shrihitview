import {
  ARTICLE_TYPE_LIST,
  ARTICLE_TYPE_CREATED,
  ARTICLE_TYPE_UPDATED,
  ARTICLE_TYPE_DELETED,
} from "../../utils/types";
  
  const initialState = {type: []};
  
  const adminArticleTypeReducer = (state=initialState, action) => {
    switch (action.type) {
      case ARTICLE_TYPE_LIST:
        return {
          types: action.payload.types,
          total_types: action.payload.total_types,
          current_page: action.payload.current_page
        };
      case ARTICLE_TYPE_CREATED:
        return {
          ...state,
          type: action.payload.type,
          types: action.payload.types,
          total_types: action.payload.total_types,
          current_page: action.payload.current_page,
        }
      case ARTICLE_TYPE_UPDATED:
        return {
          ...state,
          type: action.payload.type,
          types: action.payload.types,
          total_types: action.payload.total_types,
          current_page: action.payload.current_page, 
        }
      case ARTICLE_TYPE_DELETED:
        return{
          ...state,
          type: action.payload.type,
          types: action.payload.types,
          total_types: action.payload.total_types,
          current_page: action.payload.current_page,
        }
      default: 
        return state
    }
  };
  
  export default adminArticleTypeReducer;