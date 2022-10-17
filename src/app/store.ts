import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import exchangeRateSlice from "../slices/currencySlice";

export const store = configureStore({
  reducer: {
    exchange: exchangeRateSlice,
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
