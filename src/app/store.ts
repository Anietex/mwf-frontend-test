import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import signUpReducer from '../features/sign-up/signUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
