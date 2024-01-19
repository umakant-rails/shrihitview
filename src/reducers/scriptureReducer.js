import {
    SCRIPTURE_LIST,
  } from "../utils/types";

const initialState = {articleList: []};

const scriptureReducer = (state=initialState, action) => {
  switch (action.type) {
    case SCRIPTURE_LIST:
      return {
        ...state,
        scriptures: action.payload.scriptures,
      }
    default: 
      return state
  }
};

export default scriptureReducer;