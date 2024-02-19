import {
  CONTEXT_LIST,
  CONTEXT_CREATED,
  CONTEXT_UPDATED,
  CONTEXT_DELETED,
} from "../../utils/types";
  
  const initialState = {contextList: []};
  
  const adminContextReducer = (state=initialState, action) => {
    switch (action.type) {
      case CONTEXT_LIST:
        return {
          contexts: action.payload.contexts,
          total_contexts: action.payload.total_contexts,
          current_page: action.payload.current_page
        };
      case CONTEXT_CREATED:
        return {
          ...state,
          context: action.payload.context,
          contexts: action.payload.contexts,
          total_contexts: action.payload.total_contexts,
          current_page: action.payload.current_page,
        }
      case CONTEXT_UPDATED:
        return {
          ...state,
          context: action.payload.context,
          contexts: action.payload.contexts,
          total_contexts: action.payload.total_contexts,
          current_page: action.payload.current_page, 
        }
      case CONTEXT_DELETED:
        return{
          ...state,
          context: action.payload.context,
          contexts: action.payload.contexts,
          total_contexts: action.payload.total_contexts,
          current_page: action.payload.current_page,
        }
      default: 
        return state
    }
  };
  
  export default adminContextReducer;