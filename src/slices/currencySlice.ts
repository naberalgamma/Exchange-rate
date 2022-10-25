import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ExchangeRate = {
  currencyCodeA: number | string;
  currencyCodeB: number | string;
  date: number;
  rateBuy: number;
  rateSell: number;
};

type ExchangeRateState = {
  list: ExchangeRate[];
  loading: boolean;
  error: string | null;
};

export const fetchTodo = createAsyncThunk<
  ExchangeRate[],
  undefined,
  { rejectValue: string }
>("todo/fetchTodo", async function () {
  const response = await fetch("https://api.monobank.ua/bank/currency");

  const data = await response.json();

  return data;
});
const initialState: ExchangeRateState = {
  list: [],
  loading: false,
  error: null,
};

const exchangeRateSlice = createSlice({
  name: "asyncExchangeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.list = action.payload.filter(
          (el) => el.currencyCodeA === 840 || el.currencyCodeA === 978
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.loading = false;
        state.error = "The server is not responding";
      });
  },
});
export default exchangeRateSlice.reducer;
