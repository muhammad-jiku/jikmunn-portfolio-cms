import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore Cognito objects in actions
          ignoredActions: ['auth/login/fulfilled', 'auth/refreshSession/fulfilled'],
          ignoredPaths: ['auth.cognitoUser'],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer types from store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
