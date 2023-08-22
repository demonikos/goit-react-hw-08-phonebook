import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import { Contact } from 'components/Contact/Contact';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import css from './ContactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  return (
    <List sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      {contacts.map(contact => (
        <ListItem key={contact.id} className={css.ListItem}>
          <Contact key={contact.id} contact={contact} />
        </ListItem>
      ))}
    </List>
  );
};
