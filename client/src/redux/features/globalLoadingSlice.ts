import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface IGlobalLoading {
  globalLoading: boolean;
}
const initialState: IGlobalLoading = {
  globalLoading: false,
};
export const globalLoadingSlice = createSlice({
  name: 'GlobalLoading',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGlobalLoading = (state: RootState) => state.globalLoading;

export default globalLoadingSlice.reducer;
