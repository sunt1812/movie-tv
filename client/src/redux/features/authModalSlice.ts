import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface IOpenModal {
  openModal: boolean;
}
const initialState: IOpenModal = {
  openModal: false,
};
export const authModalSlice = createSlice({
  name: 'AuthModal',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
  },
});

export const { setOpenModal } = authModalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthModal = (state: RootState) => state.authModal;

export default authModalSlice.reducer;
