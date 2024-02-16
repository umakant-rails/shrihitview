import {
  AUTHOR_CREATED,
  AUTHOR_LIST,
  AUTHOR_NEW,
  SAMPRADAYA_CREATED
} from "../../utils/types";
  
  const initialState = {authorList: []};
  
  const adminAuthorReducer = (state=initialState, action) => {
    switch (action.type) {
      case AUTHOR_NEW:
        return {
          ...state,
          sampradayas: action.payload.sampradayas,
        };
      case SAMPRADAYA_CREATED:
        return {
          sampradayas: action.payload.sampradayas,
          sampradayaCreated: action.payload.sampradaya_created,
        }
      // case TAG_CREATED:
      //   return {
      //     ...state,
      //     tags: action.payload.tags
      //   }
      case AUTHOR_LIST:
        return {
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
          current_page: action.payload.current_page
        };
      case AUTHOR_CREATED:
        return {
          authorCreated: action.payload.author_created
        }
      // case ARTICLE_SHOW:
      //   return {
      //     article: action.payload.article
      //   }
      // case ARTICLE_EDIT:
      //   return {
      //     article: action.payload.article,
      //     authors: action.payload.authors,
      //     raags: action.payload.raags,
      //     tags: action.payload.tags,
      //     contexts: action.payload.contexts,
      //     articleTypes: action.payload.articleTypes,
      //     scriptures: action.payload.scriptures
      //   };
      // case ARTICLE_UPDATED:
      //   return {
      //     ...state,
      //     updatedArticle: action.payload.articleUpdated 
      //   }
      // case ARTICLE_DELETED:
      //   return{
      //     ...state,
      //     articles: action.payload.articles,
      //     totalArticles: action.payload.total_articles,
      //   }
      default: 
        return state
    }
  };
  
  export default adminAuthorReducer;