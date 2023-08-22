import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
  fetchLogIn,
  fetchLogOut,
  fetchRefresh,
  fetchSignUp,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,

    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,

    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [deleteContact.rejected]: handleRejected,

    [editContact.pending]: handlePending,
    [editContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items[index] = action.payload;
    },
    [editContact.rejected]: handleRejected,
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
  },
  reducers: {
    filterContacts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: '',
    isLoading: false,
    isLoggIn: false,
    isRefreshing: false,
    error: null,
  },
  reducers: {
    clearErrorOnUnmount: state => {
      state.error = null;
    },
  },
  extraReducers: {
    [fetchSignUp.pending]: handlePending,
    [fetchSignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggIn = true;
      state.isRefreshing = true;
    },
    [fetchSignUp.rejected]: handleRejected,

    [fetchLogIn.pending]: handlePending,
    [fetchLogIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggIn = true;
      state.isRefreshing = true;
    },
    [fetchLogIn.rejected]: handleRejected,

    [fetchLogOut.pending]: handlePending,
    [fetchLogOut.fulfilled]: state => {
      state.isLoading = false;
      state.token = '';
      state.isLoggIn = false;
      state.isRefreshing = false;
    },
    [fetchLogOut.rejected]: handleRejected,

    [fetchRefresh.pending]: state => {
      state.isLoading = true;
      state.isRefreshing = true;
    },
    [fetchRefresh.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggIn = true;
      state.isRefreshing = false;
    },
    [fetchRefresh.rejected]: (state, action) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = action.payload;
    },
  },
});

export const { clearErrorOnUnmount } = authorizationSlice.actions;
