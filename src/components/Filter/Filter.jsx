import React from 'react';
import { filterContacts } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import { TextField } from '@mui/material';

import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);

  const onChangeFilter = event => {
    dispatch(filterContacts(event.target.value.toLowerCase()));
  };

  return (
    <div className={css.SearchBlock}>
      <TextField
        className={css.SearchInput}
        id="outlined-basic"
        type="text"
        name="name"
        label="Find contacts by name"
        variant="outlined"
        value={filterRedux}
        onChange={onChangeFilter}
      />
    </div>
  );
};
