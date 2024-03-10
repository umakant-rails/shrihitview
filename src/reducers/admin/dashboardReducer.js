import {
  DASHBOARD_DATA
} from "../../utils/types";
  
  const initialState = {total_articles: []};
  
  const adminDashboardReducer = (state=initialState, action) => {
    switch (action.type) {
      case DASHBOARD_DATA:
        return {
          ...state,
          total_articles: action.payload.total_articles,
          total_authors: action.payload.total_authors,
          total_tags: action.payload.total_tags,
          total_contexts: action.payload.total_contexts,
          articles_by_time: action.payload.articles_by_time,
          articles_by_type: action.payload.articles_by_type,
          articles_by_context: action.payload.articles_by_context,
          contexts_by_approval: action.payload.contexts_by_approval,
        };
      default: 
        return state
    }
  };
  
  export default adminDashboardReducer;