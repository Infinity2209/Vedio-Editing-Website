import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import subtitleReducer from './slices/subtitleSlice';
import overlayReducer from './slices/overlaySlice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
    subtitle: subtitleReducer,
    overlay: overlayReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Allows URLs in the store
    })
});
