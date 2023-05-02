import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface IThemeMode {
  themeMode: string;
}

// Define the initial state using that type
const isThemeMode = localStorage.getItem('theme') || 'dark';

const initialState: IThemeMode = { themeMode: isThemeMode };

export const themeModeSlice = createSlice({
  name: 'ThemeMode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        themeMode: action.payload,
      };
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectThemeMode = (state: RootState) => state.themeMode;

export default themeModeSlice.reducer;
