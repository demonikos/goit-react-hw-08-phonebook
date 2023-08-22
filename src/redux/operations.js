import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, Notify } from 'notiflix';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setAuthorization = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthorization = () => {
  axios.defaults.headers.common.Authorization = '';
};

const fetchSignUp = createAsyncThunk('users/signup', async (user, thunkAPI) => {
  try {
    Loading.hourglass('Loading sign up...');
    const response = await axios.post('/users/signup', user);
    setAuthorization(response.data.token);
    console.log(response);
    console.log(user);

    Notify.success(`Greetings ${user.name}!`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    Loading.remove();
  }
});

const fetchLogIn = createAsyncThunk('users/login', async (user, thunkAPI) => {
  try {
    Loading.hourglass('Loading log in...');
    const response = await axios.post('/users/login', user);
    setAuthorization(response.data.token);
    console.log(response.data);
    const userName = response.data.user.name;
    Notify.success(`Welcome back, ${userName}, how it's going?`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    Loading.remove();
  }
});

const fetchLogOut = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    Loading.hourglass('Loading log out...');
    const response = await axios.post('/users/logout');
    clearAuthorization();
    Notify.success(`Bye-bye!`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    Loading.remove();
  }
});

const fetchRefresh = createAsyncThunk('users/current', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  if (!state.authorization.token) {
    return thunkAPI.rejectWithValue();
  }
  setAuthorization(state.authorization.token);
  try {
    Loading.hourglass('Loading, please wait a second ...');
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  } finally {
    Loading.remove();
  }
});

let isLoading = false;

const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      Loading.hourglass('Loading all contacts...');
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      Loading.remove();
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      isLoading = true;
      const response = await axios.post('/contacts', contact);
      Notify.success(`Contact ${response.data.name} added`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      isLoading = false;
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      isLoading = true;
      const response = await axios.delete(`/contacts/${id}`);
      Notify.success(`Contact ${response.data.name} deleted`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      isLoading = false;
    }
  }
);

const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    try {
      const name = contact.name;
      const number = contact.number;
      isLoading = true;
      const response = await axios.patch(`/contacts/${contact.id}`, {
        name,
        number,
      });
      Notify.success(`Contact ${response.data.name} was edited`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      isLoading = false;
    }
  }
);

export {
  fetchSignUp,
  fetchLogIn,
  fetchLogOut,
  fetchRefresh,
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  isLoading,
};
