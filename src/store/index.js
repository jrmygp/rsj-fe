import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
