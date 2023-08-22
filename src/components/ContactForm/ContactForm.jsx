import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact, isLoading } from 'redux/operations';
import { Notify } from 'notiflix';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';

import css from './ContactForm.module.css';

const nameExp = new RegExp(
  "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
);
const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const load = isLoading;

  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  const addNewContact = (name, number) => {
    if (
      !contacts.some(elem => elem.name.toLowerCase() === name.toLowerCase())
    ) {
      dispatch(addContact({ name, number }));

      setState(prevState => {
        return { ...prevState, name: '', number: '' };
      });
    } else {
      Notify.info(`Contact ${name} is already exist! Write another one!`);
    }
  };

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onSubmitHandler = event => {
    event.preventDefault();
    if (!event.target.elements.name.value.match(nameExp)) {
      Notify.failure(
        `Wrong value. Name may contain only letters, apostrophe, dash and spaces.`
      );
      return;
    }

    if (!event.target.elements.number.value.match(phoneExp)) {
      Notify.failure(
        `Wrong value. Phone number must be digits and can contain dashes, parentheses and can start with +.`
      );
      return;
    }

    addNewContact(state.name, state.number);
  };

  const onInputChange = event => {
    if (event.target.name === 'number' && event.target.value.length > 16) {
      Notify.failure(
        'Too much signs in number. Please, check the inputed value'
      );
      return;
    }

    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <form className={css.Form} onSubmit={onSubmitHandler}>
      <TextField
        id="outlined-basic-contact-name"
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        value={state.name}
        pattern={nameExp}
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
        onChange={onInputChange}
      />
      <TextField
        id="outlined-basic-contact-phone"
        type="tel"
        name="number"
        label="Phone number"
        variant="outlined"
        value={state.number}
        pattern={phoneExp}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onInputChange}
      />

      <LoadingButton
        className={css.Button}
        type="submit"
        color="primary"
        onSubmit={onSubmitHandler}
        loading={load}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        <span>Save</span>
      </LoadingButton>
    </form>
  );
};
