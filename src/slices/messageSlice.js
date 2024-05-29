import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {type: '', message: ''}
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage(state, action){
      const { payload } = action;
      if(payload.data.error){
        toast.error(payload.data.error.join("\n"))
        //state.type = 'error';state.message=payload.data.error.join("\n");
      } else {
        toast.success(payload.data.notice)
        // state.type = 'success';state.message=payload.data.notice;
      }
    },
    showNotice(state, action){
      const { payload } = action;
      //state.type = 'success';state.message=payload;
      toast.error(payload)
    },
    showError(state, action){
      const { payload } = action;
      //state.type = 'error';state.message=payload;
      toast.error(payload)
    },
    clearMessage(state){
      return {...state, message: ''}
    }
  },
  extraReducers(builder) {
  },
});

export const {showMessage, showNotice, showError, clearMessage} = messageSlice.actions;
export default messageSlice.reducer;