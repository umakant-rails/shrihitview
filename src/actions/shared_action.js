import { SET_MESSAGE } from "../utils/types";

const dataDispatchToReducer = (response, action_type) => async dispatch => {
  if(response.status === 200){
    if(response.data.error === undefined){
      dispatch({type: SET_MESSAGE, msg_type: "success", payload: response.data.notice });
      dispatch({type: action_type, payload: response.data });
    } else {
      dispatch({type: SET_MESSAGE, msg_type: "error", payload: response.data.error.join("\n")});
    }
  } else {
    dispatch({ type: SET_MESSAGE, msg_type: "error", payload: response.data,});
  }
}

export default dataDispatchToReducer;