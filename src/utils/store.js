import { configureStore } from '@reduxjs/toolkit'
// import reducers from '../reducers';
import reducers from '../slices';

// export default configureStore({
//     reducer: reducers,
// });

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['message/showMessage', 'message/showNotice', 'message/showError'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});