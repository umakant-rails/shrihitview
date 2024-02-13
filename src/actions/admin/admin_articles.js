import baseUrl from "../../services/AxiosService";
import {
  ARTICLE_NEW,
  ARTICLE_CREATED,
  ARTICLE_LIST,
  TAG_CREATED,
  SET_MESSAGE,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_DELETED,
  ARTICLE_LIST_BY_PAGE,
} from "../../utils/types";

export const newArticle = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles/new', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response && response.status === 200){
    dispatch({
      type: ARTICLE_NEW, 
      payload: {
        statusCode: response.status,
        article_types: response.data.article_types,
        scriptures: response.data.scriptures,
        raags: response.data.raags,
        contexts: response.data.contexts,
        authors: response.data.authors,
        tags: response.data.tags
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const createArticle = (form) => async dispatch => {
  const response = await baseUrl.post(
    '/articles', {article: form}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: ARTICLE_CREATED, 
      payload: {
        articleCreated: response.data.article,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const editArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}?action_type=edit`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response && response.status === 200){
    dispatch({
      type: ARTICLE_EDIT, 
      payload: {
        statusCode: response.status,
        articleTypes: response.data.article_types,
        scriptures: response.data.scriptures,
        raags: response.data.raags,
        contexts: response.data.contexts,
        authors: response.data.authors,
        tags: response.data.tags,
        article: response.data.article
      }
    });
  } else if(response){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.statusText
    });
  }
}

export const updateArticle = (id, form) => async dispatch => {
  const response = await baseUrl.put(
    `/articles/${id}`, {article: form}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: ARTICLE_UPDATED, 
      payload: {
        articleUpdated: response.data.article,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const deleteArticle = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/articles/${id}`
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.data.error === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
     dispatch({
      type: ARTICLE_DELETED, 
      payload: {
        articles: response.data.articles,
        total_articles: response.data.total_articles,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error.join("\n"),
    });
  }
}

export const createTag = (tag) => async dispatch => {
  const response = await baseUrl.post(
    '/tags', {tag: {name: tag}}
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
 
  if(response.status === 200){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.status,
    });
    dispatch({
      type: TAG_CREATED, 
      payload: {
        statusCode: response.status,
        tags: response.data.tags,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
    });
  }
}

export const getArticles = () => async dispatch => {
  const response = await baseUrl.get(
    '/articles',
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
     dispatch({
      type: ARTICLE_LIST, 
      payload: {
        articles: response.data.articles,
        totalArticles: response.data.total_articles,
        authors: response.data.authors,
        tags: response.data.tags,
        raags: response.data.raags,
        contexts: response.data.contexts,
        articleTypes: response.data.article_types,
        scriptures: response.data.scriptures,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}

export const getArticlesByPage = (page) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/pages/${page}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
     dispatch({
      type: ARTICLE_LIST_BY_PAGE, 
      payload: {
        articles: response.data.articles,
        totalArticles: response.data.total_articles,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}

export const getArticle = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/articles/${id}`,
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  
  if(response.status === 200){
     dispatch({
      type: ARTICLE_SHOW, 
      payload: {
        article: response.data.article,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.error,
    });
  }
}