import {
  COMMENT_CREATED, 
  COMMENT_DELETED, 
  COMMENT_REPLIED, 
  COMMENT_UPDATED,
} from "../../utils/types";
  
const initialState = {comments: []};

const userCommentReducer = (state=initialState, action) => {
  switch (action.type) {
    case COMMENT_CREATED:
      return {
        ...state,
        article_comments: action.payload.comments,
      };
    case COMMENT_UPDATED:
      return {
        ...state,
        article_comments: action.payload.comments,
      };
      case COMMENT_REPLIED:
        return {
          ...state,
          article_comments: action.payload.comments,
        };
    case COMMENT_DELETED:
      return {
        ...state,
        article_comments: action.payload.comments,
      };
    default: 
      return state
  }
};

export default userCommentReducer;