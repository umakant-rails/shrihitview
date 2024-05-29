import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../services/AxiosService";

// import { SET_MESSAGE } from "../utils/types";
// import { showMessage } from "./messageSlice";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async ({formValues}, {dispatch, rejectWithValue }) => {
    try {
      formValues['role_id'] = 3;
      const response = await baseUrl.post('/users/register', {user: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/users/login', {user: formValues});
      if (response.data.error === undefined) {
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        console.log(response)
        dispatch({type: 'message/showMessage', payload: response});
        return response.data;
      }
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({formValues}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put('/users/password', {user: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updatePasswordByToken = createAsyncThunk(
  "auth/updatePasswordByToken",
  async ({formValues}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put('/users/password', {user: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const sendPasswordToken = createAsyncThunk(
  "auth/sendPasswordToken",
  async ({formValues}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/users/password', {user: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const confirmUserAccount = createAsyncThunk(
  "auth/confirmUserAccount",
  async ({token}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/users/confirmation?confirmation_token=${token}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getUserRole = createAsyncThunk(
  "auth/getUserRole",
  async ({user_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/users/get_role`);
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = () => async dispatch => {
  return await baseUrl.get('/current_user');
}

export const sendPasswordTokenn = createAsyncThunk(
  "auth/sendPasswordToken",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/users/password', {user: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  error: "", loading: false, password_token_sent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(sendPasswordTokenn.pending, (state, action) => { 
      state.loading = true;
    }).addCase(sendPasswordTokenn.fulfilled, (state, action) => {
      state.loading = false; state.password_token_sent = true;
    }).addCase(sendPasswordTokenn.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;