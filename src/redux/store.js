import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice, filterSlice, authorizationSlice } from './slices';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

export const authorizationReducer = persistReducer(
  persistConfig,
  authorizationSlice.reducer
);

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const { filterContacts } = filterSlice.actions;
