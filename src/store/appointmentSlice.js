import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  existingAppointment: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setExistingAppointment: (state, action) => {
      state.existingAppointment = action.payload;
    },
    clearExistingAppointment: (state) => {
      state.existingAppointment = null;
    },
  },
});

export const { setExistingAppointment, clearExistingAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
