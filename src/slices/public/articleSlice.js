import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";


export const getArticles = createAsyncThunk(
  "pbArticle/getArticles",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/articles`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getArticlesByPage = createAsyncThunk(
  "publicArticle/getArticlesByPage",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/articles?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getArticle = createAsyncThunk(
  "publicArticle/getArticle",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/articles/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

/* send response back to caller component */
export const searchToArticles = (term, page) => async(dispatch) => {
  const response = await baseUrl.get(
    '/pb/articles/search_articles', 
    {params: {term: term, page: page}}
    ).then(response => {
    return response;
  }).catch(function (error) {
    dispatch({ type: "message/showError", payload: 'Some Error has occured. Please try again.'});
    return {data: {articles: []}};
  });
  return response;
}

const initialState = {error: "", loading: false};

const articleSlice = createSlice({
  name: "pbArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.total_articles = action.payload.total_articles;
      state.authors = action.payload.authors;
      state.tags = action.payload.tags;
      state.contexts = action.payload.contexts;
      state.article_types = action.payload.article_types;
    })

    .addCase(getArticlesByPage.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.total_articles = action.payload.total_articles;
    })
    
    .addCase(getArticle.fulfilled, (state, action) => {
      state.article = action.payload.article;
    });
  }  
});


export default articleSlice.reducer;

// const initialState = {
//   error: "", loading: false
// };
// const articleSlice = createSlice({
//   name: "pbArticle",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//     .addCase(getArticles.pending, (state, action) => { 
//       state.loading = true;
//     }).addCase(getArticles.fulfilled, (state, action) => {
//       state.loading = false;
//       state.articles = action.payload.articles;
//       state.total_articles = action.payload.total_articles;
//       state.authors = action.payload.authors;
//       state.tags = action.payload.tags;
//       state.contexts = action.payload.contexts;
//       state.article_types = action.payload.article_types;
       
//     }).addCase(getArticles.rejected, (state, action) => {
//       state.loading = false; state.password_updated_by_token = false;
//     });
//   },
// });

// export default articleSlice.reducer;
