import {
  PB_STROTUM_LIST,
  PB_STROTUM_SHOW,
} from "../../utils/types";

const initialState = {strota: []};

const strotumReducer = (state=initialState, action) => {
  switch (action.type) {
    case PB_STROTUM_LIST:
      return {
        ...state,
        strota: action.payload.strota,
        strota_types: action.payload.strota_types
      };
    case PB_STROTUM_SHOW:
      return {
        ...state,
        strota: action.payload.strota,
        strotum: action.payload.strotum,
        strotum_articles: action.payload.strotum_articles,
      };
    default: 
      return state
  }
};

export default strotumReducer;