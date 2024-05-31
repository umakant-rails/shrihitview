import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getStories = createAsyncThunk(
  "pbStory/getStories",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/stories?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getStory = createAsyncThunk(
  "pbStory/getStory",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/stories/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const storySlice = createSlice({
  name: "pbStory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getStories.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action, "---------------" );
      state.stories = action.payload.stories;
      state.total_stories = action.payload.total_stories
    })

    .addCase(getStory.fulfilled, (state, action) => {
      console.log(action.payload.story)
      state.story = action.payload.story;
      state.stories = action.payload.stories;
    });
  }  
});

export default storySlice.reducer;