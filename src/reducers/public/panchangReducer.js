import {
  PB_PANCHANG_LIST,
  PB_PANCHANG_SHOW,
  PB_NAVIGATE_MONTH,
 
} from "../../utils/types";
  
  const initialState = {panchangList: []};
  
  const panchangReducer = (state=initialState, action) => {
    switch (action.type) {
      case PB_PANCHANG_LIST:
        return {
          ...state,
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
        }
      case PB_PANCHANG_SHOW:
        return {
          panchang: action.payload.panchang,
        }
      case PB_NAVIGATE_MONTH:
        return {
          panchang: action.payload.panchang,
          tithis: action.payload.tithis,
        }
      default: 
        return state
    }
  };
  
  export default panchangReducer;