import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getScrStories = createAsyncThunk(
  "adminScripture/getScrStories",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(
        `/admin/scriptures/${id}/get_stories?${paramsStr}`
      );
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteScrStory = createAsyncThunk(
  "adminScripture/deleteScrStory",
  async ({id, story_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.delete(
        `/admin/scriptures/${id}/stories/${story_id}?${paramsStr}`
      );
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {loading: false};

const adminStoryScriptureSlice = createSlice({
  name: "adminStoryScripture",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(deleteScrStory.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteScrStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteScrStory.rejected, (state, action) => {
      state.loading = false;
    })

    // .addCase(updateIndex.pending, (state, action) => {
    //   state.loading = true;
    // }).addCase(updateIndex.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    //   state.loading = false;
    // }).addCase(updateIndex.rejected, (state, action) => {
    //   state.loading = false;
    // })
    
    .addCase(getScrStories.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    });
  },
});

export default adminStoryScriptureSlice.reducer;
