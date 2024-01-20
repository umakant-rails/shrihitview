import {
    SCRIPTURE_LIST,
    SCRIPTURE_SHOW,
  } from "../utils/types";

const initialState = {articleList: []};

const scriptureReducer = (state=initialState, action) => {
  switch (action.type) {
    case SCRIPTURE_LIST:
      return {
        ...state,
        scriptures: action.payload.scriptures,
      }
    case SCRIPTURE_SHOW:
        return {
          ...state,
          scripture: action.payload.scripture,
          scr_articles: action.payload.articles
        }
    default: 
      return state
  }
};

export default scriptureReducer;