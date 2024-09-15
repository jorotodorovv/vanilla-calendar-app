import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './appointmentSlice';

// Create and export the Redux store
const store = configureStore({
  reducer: {
    appointment: appointmentReducer, // Combine reducers
  },
});

export default store;
