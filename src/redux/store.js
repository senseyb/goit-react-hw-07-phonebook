import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducer from './app/app-reducer';

console.log(getDefaultMiddleware());

const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
