import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../services/AxiosService";
import { showError, showMessage } from "./messageSlice";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      formValues['role_id'] = 3;
      const response = await baseUrl.post('/users/signup', {user: formValues});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

/* send response back to caller component */
// export const userLogin = createAsyncThunk(
//   "auth/userLogin",
//   async (formValues, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await baseUrl.post('/users/login', {user: formValues});
//       if (response.data.error === undefined) {
//         localStorage.setItem("token", response.headers.authorization);
//         localStorage.setItem("currentUser", JSON.stringify(response.data.user));
//           dispatch(showMessage(response.data));
//         return response;
//       }
//       dispatch(showMessage(response.data));
//       return response;
//     } catch (error) {
//       dispatch(showError(error.message));
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const userLogin = (formValues) => async dispatch => {
  try{
    const response = await baseUrl.post('/users/login', {user: formValues});
    if (response.data.error === undefined) {
      localStorage.setItem("token", response.headers.authorization);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      dispatch(showMessage(response.data));
      return response.data;
    } else{
      dispatch(showMessage(response.data));
    }
  } catch (error) {
    dispatch(showError(error.message));
  }
}

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put('/users/password', {user: formValues});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const updatePasswordByToken = createAsyncThunk(
  "auth/updatePasswordByToken",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put('/users/password', {user: formValues});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const sendPasswordToken = createAsyncThunk(
  "auth/sendPasswordToken",
  async ({form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/users/password', {user: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const confirmUserAccount = createAsyncThunk(
  "auth/confirmUserAccount",
  async (token, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/users/confirmation?confirmation_token=${token}`);
      dispatch(showMessage(response.data));
      console.log(response)
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

/* send response back to caller component */
export const getUserRole = () => async dispatch => {
  try {
    const response = await baseUrl.post(`/users/get_role`);
    return response;
  } catch (error) {
    dispatch(showError(error.message));
  }
}


/* send response back to caller component */
export const getCurrentUser = () => async dispatch => {
  return await baseUrl.get('/current_user');
}

const initialState = {
  error: "", loading: false, password_token_sent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(userRegister.pending, (state, action) => { 
      state.loading = true;
    }).addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false; state.registered_user=action.payload.user;
    }).addCase(userRegister.rejected, (state, action) => {
      state.loading = false; 
    })

    .addCase(updatePassword.pending, (state, action) => { 
      state.loading = true;
    }).addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false; state.password_changed = true;
    }).addCase(updatePassword.rejected, (state, action) => {
      state.loading = false; state.password_changed = false;
    })

    .addCase(updatePasswordByToken.pending, (state, action) => { 
      state.loading = true;
    }).addCase(updatePasswordByToken.fulfilled, (state, action) => {
      state.loading = false; state.password_updated_by_token = true;
    }).addCase(updatePasswordByToken.rejected, (state, action) => {
      state.loading = false; state.password_updated_by_token = false;
    })

    .addCase(sendPasswordToken.pending, (state, action) => { 
      state.loading = true;
    }).addCase(sendPasswordToken.fulfilled, (state, action) => {
      state.loading = false; state.password_token_sent = true;
    }).addCase(sendPasswordToken.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(confirmUserAccount.pending, (state, action) => { 
      state.loading = true;
    }).addCase(confirmUserAccount.fulfilled, (state, action) => {
      state.loading = false; state.account_confirmed = true;
    }).addCase(confirmUserAccount.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
