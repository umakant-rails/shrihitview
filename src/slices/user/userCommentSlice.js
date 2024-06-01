import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const createComment = createAsyncThunk(
  "usrComment/createComment",
  async ({article, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/articles/${article.id}/comments`, {comment: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "usrComment/updateComment",
  async ({article, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/articles/${article.id}/comments/${form.parent_id}`, {comment: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const replyComment = createAsyncThunk(
  "usrComment/replyComment",
  async ({article, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/articles/${article.id}/comments/reply`, {comment: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "usrComment/deleteComment",
  async ({article, comment_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/articles/${article.id}/comments/${comment_id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userCommentSlice = createSlice({
  name: "usrComment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(createComment.pending, (state, action) => {
      state.loading = true;
    }).addCase(createComment.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      //state.article_comments = action.payload.comments;
      state.loading = false;
    }).addCase(createComment.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateComment.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateComment.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
    })
  
    .addCase(replyComment.pending, (state, action) => {
      state.loading = true;
    }).addCase(replyComment.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(replyComment.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteComment.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteComment.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userCommentSlice.reducer;