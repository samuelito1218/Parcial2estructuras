import { configureStore } from '@reduxjs/toolkit';
import centroAtencionReducer from './centroAtencionSlice';

export const store = configureStore({
  reducer: {
    centroAtencion: centroAtencionReducer
  }
});
