import { configureStore } from '@reduxjs/toolkit';
import globalLoadingSlice from './features/globalLoadingSlice';
import themeModeSlice from './features/themeModeSlice';
import authSlice from './features/authSlice';
import authModalSlice from './features/authModalSlice';

export const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    globalLoading: globalLoadingSlice,
    userSlice: authSlice,
    authModal: authModalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
