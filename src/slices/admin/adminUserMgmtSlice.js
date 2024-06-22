import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getAllUsers = createAsyncThunk(
  "adminUserMgmt/getAllUsers",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/admin/user_mgmts?${paramsStr}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminUserMgmt/deleteUser",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/user_mgmts/${id}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminUserMgmtSlice = createSlice({
  name: "adminUserMgmt",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    // .addCase(getArticlesByPage.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    // })

    // .addCase(approveArticle.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(approveArticle.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(approveArticle.rejected, (state, action) => {
    //   state.loading = false;
    // })

    .addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteUser.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminUserMgmtSlice.reducer;