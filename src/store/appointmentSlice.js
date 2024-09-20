import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  existingAppointment: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    /**
     * Updates the existing appointment in the state
     * @param {Object} state - The current state object
     * @param {Object} action - The action object containing the payload
     * @param {Object} action.payload - The new existing appointment data
     * @returns {void} This function doesn't return anything, it mutates the state directly
     */
    setExistingAppointment: (state, action) => {
      state.existingAppointment = action.payload;
    },
    /**
     * Clears the existing appointment in the state
     * @param {Object} state - The current state object
     * @returns {void} This function doesn't return a value
     */
    clearExistingAppointment: (state) => {
      state.existingAppointment = null;
    },
  },
});

export const { setExistingAppointment, clearExistingAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
