import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: new Date(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
