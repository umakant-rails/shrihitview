import {
    PB_SCRIPTURE_LIST,
    PB_SCRIPTURE_SHOW,
  } from "../../utils/types";

const initialState = {articleList: []};

const scriptureReducer = (state=initialState, action) => {
  switch (action.type) {
    case PB_SCRIPTURE_LIST:
      return {
        ...state,
        scriptures: action.payload.scriptures,
      }
    case PB_SCRIPTURE_SHOW:
        return {
          ...state,
          scripture: action.payload.scripture,
          articles: action.payload.articles
        }
    default: 
      return state
  }
};

export default scriptureReducer;