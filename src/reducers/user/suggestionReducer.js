import {
  SUGGESTION_CREATED,
  SUGGESTION_DELETED,
  SUGGESTION_EDIT,
  SUGGESTION_LIST,
  SUGGESTION_SHOW,
  SUGGESTION_UPDATED,
} from "../../utils/types";

const initialState = {suggestions: []};

const userSuggestionReducer = (state=initialState, action) => {
  switch (action.type) {
    case SUGGESTION_LIST:
      return {
        ...state,
        suggestions: action.payload.suggestions,
        total_suggestions: action.payload.total_suggestions,
        page: action.payload.page
      };
    case SUGGESTION_SHOW:
      return {
        suggestion: action.payload.suggestion,
      };
    case SUGGESTION_CREATED:
      return {
        suggestion: action.payload.suggestion,
      };
    case SUGGESTION_EDIT:
      return {
        suggestion: action.payload.suggestion,
      };
    case SUGGESTION_UPDATED:
      return {
        isUpdated: action.payload.suggestion,
      };
    case SUGGESTION_DELETED:
      return {
        ...state,
        suggestions: action.payload.suggestions,
        total_suggestions: action.payload.total_suggestions,
        page: action.payload.page
      };
    default: 
      return state
  }
};

export default userSuggestionReducer;