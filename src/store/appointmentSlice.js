import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  existingAppointment: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    ```
    /**
     * Sets the existing appointment in the state
     * @param {Object} state - The current state object
     * @param {Object} action - The action object containing the payload
     * @param {Object} action.payload - The existing appointment data to be set
     * @returns {void} This function does not return a value
     */
    ```
    setExistingAppointment: (state, action) => {
      state.existingAppointment = action.payload;
    },
    /**
     * Clears the existing appointment from the state
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
