import {
  PB_SUGGESTION_CREATED,
  PB_SUGGESTION_LIST,
  PB_SUGGESTION_SHOW,
} from "../../utils/types";

const initialState = {suggestions: []};

const suggestionReducer = (state=initialState, action) => {
  switch (action.type) {
    case PB_SUGGESTION_LIST:
      return {
        ...state,
        suggestions: action.payload.suggestions,
        total_suggestions: action.payload.total_suggestions,
        page: action.payload.page
      };
    case PB_SUGGESTION_SHOW:
      return {
        suggestion: action.payload.suggestion,
      };
    case PB_SUGGESTION_CREATED:
      return {
        suggestion: action.payload.suggestion,
      };
    default: 
      return state
  }
};

export default suggestionReducer;