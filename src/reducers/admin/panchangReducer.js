import {
  PANCHANG_LIST,
  PANCHANG_CREATED,
  PANCHANG_DELETED,
  PANCHANG_SHOW,
 
} from "../../utils/types";
  
  const initialState = {panchangList: []};
  
  const adminPanchangReducer = (state=initialState, action) => {
    switch (action.type) {
      case PANCHANG_LIST:
        return {
          ...state,
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
        }
      case PANCHANG_CREATED:
        return {
          ...state,
          panchang: action.payload.panchang,
        }
      case PANCHANG_SHOW:
        console.log('show', action.payload)
        return {
          ...state,
          panchang: action.payload.panchang,
        }
      case PANCHANG_DELETED:
        return {
          ...state,
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
        }
      default: 
        return state
    }
  };
  
  export default adminPanchangReducer;