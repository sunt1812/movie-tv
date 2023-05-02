import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFavorite, IMediaId, IUser } from '../../utils/interfaces';
import { RootState } from '../store';

interface IUserState {
  user: IUser | null;
  listFavorites: IFavorite[];
}
const initialState: IUserState = { user: null, listFavorites: [] };
export const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setUserSlice: (state, action: PayloadAction<IUser | null>) => {
      if (action.payload === null) {
        localStorage.removeItem('token');
      } else {
        if (action.payload.token)
          localStorage.setItem('token', action.payload.token);
      }

      state.user = action.payload;
    },
    addFavorite: (state, action: PayloadAction<IFavorite>) => {
      return {
        ...state,
        listFavorites: [...state.listFavorites, action.payload],
      };
    },
    removeFavorite: (state, action: PayloadAction<IMediaId>) => {
      return {
        ...state,
        listFavorite: state.listFavorites.filter(
          (e) => e.mediaId !== action.payload.mediaId
        ),
      };
    },
  },
});

export const { setUserSlice, addFavorite, removeFavorite } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthSlice = (state: RootState) => state.userSlice;

export default authSlice.reducer;
