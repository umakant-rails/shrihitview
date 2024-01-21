import {
  STROTUM_LIST,
  STROTUM_SHOW,
} from "../utils/types";

const initialState = {strota: []};

const strotumReducer = (state=initialState, action) => {
  switch (action.type) {
    case STROTUM_LIST:
      return {
        ...state,
        strota: action.payload.strota,
        strota_types: action.payload.strota_types
      };
    case STROTUM_SHOW:
      console.log(action.payload)
      return {
        ...state,
        strota: action.payload.strota,
        strotum: action.payload.strotum,
      };
    default: 
      return state
  }
};

export default strotumReducer;