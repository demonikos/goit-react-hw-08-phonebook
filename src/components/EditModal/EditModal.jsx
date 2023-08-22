import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

const nameExp = new RegExp(
  "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
);
const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const ContactEditModal = (id, name, number) => {
  const [openModal, setOpenModal] = useState(false);

  const [state, setState] = useState({
    id: '',
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onClickEdit = (id, name, number) => {
    setState(prevState => {
      return { ...prevState, id: id, name: name, number: number };
    });
    console.log({ id, name, number });
    console.log(state);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    console.log(`newstate - `, state);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const editSubmitHandler = event => {
    event.preventDefault();
    if (!event.target.name === 'name' && event.target.value.match(nameExp)) {
      Notify.failure(
        `Wrong value. Name may contain only letters, apostrophe, dash and spaces.`
      );
      return;
    }

    if (!event.target.name === 'number' && event.target.value.match(phoneExp)) {
      Notify.failure(
        `Wrong value. Phone number must be digits and can contain dashes, parentheses and can start with +.`
      );
      return;
    }

    editContactInfo(contacts.id, state.name, state.number);
  };

  const editContactInfo = (id, name, number) => {
    if (
      !contacts.some(elem => elem.name.toLowerCase() === name.toLowerCase())
    ) {
      dispatch(editContact(id, name, number));

      setState(prevState => {
        return { ...prevState, name: '', number: '' };
      });
    } else {
      Notify.info(`Contact ${name} is already exist! Write another one!`);
    }
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
    <>
      <Dialog open={openModal} onClose={handleCloseModal} onClick={onClickEdit}>
        <DialogTitle>Edit contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the contact, please change name or phone of it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="edit-contact-name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            pattern={nameExp}
            value={state.name}
            onChange={onInputChange}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="edit-contact-number"
            label="Phone number"
            type="tel"
            fullWidth
            variant="standard"
            pattern={phoneExp}
            value={state.number}
            onChange={onInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={editSubmitHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
