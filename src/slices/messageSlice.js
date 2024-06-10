import { createSlice } from "@reduxjs/toolkit";
const initialState = {type: '', message: ''}
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: {
      reducer: (state, action) => {
        state.type = action.payload.type;
        state.message=action.payload.message;
      },
      prepare: (data) => {
        if(data.error === undefined){
          return {payload: {type: 'success', message: data.notice}};
        } else {
          return {payload: {type: 'error', message: data.error.join("\n")}};
        }
      }
    },
    showNotice: {
      reducer: (state, action) => {
        state.type = action.payload.type;
        state.message=action.payload.message;
      },
      prepare: (msg) => {
        return {payload: {type: 'success', message: msg}};
      }
    },
    showError: {
      reducer: (state, action) => {
        state.type = action.payload.type;
        state.message=action.payload.message;
      },
      prepare: (error) => {
        return {payload: {type: 'error', message: error}};
      }
    },
  },
  extraReducers(builder) {
  },
});

export const {showMessage, showNotice, showError} = messageSlice.actions;
export default messageSlice.reducer;