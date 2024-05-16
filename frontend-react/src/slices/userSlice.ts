import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../components/interfaces/userInterfaces';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  userRole: string | null;
  userId: number | null;
  facultyNumber: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  userRole: null,
  userId: null,
  facultyNumber: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; userRole: string; userId: number }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
      state.facultyNumber = action.payload.user.facultyNumber;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userRole = null;
      state.userId = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
