import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'test',
  username: 'testUsername',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.name = '';
      state.username = '';
      state.role = '';
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
