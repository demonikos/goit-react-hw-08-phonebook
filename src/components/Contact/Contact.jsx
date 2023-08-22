import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { deleteContact, editContact } from 'redux/operations';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import css from './Contact.module.css';

// import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import { FormDialog } from 'components/EditModal/EditModal';
import { TextField } from '@mui/material';
// import { Notify } from 'notiflix';
// import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { Notify } from 'notiflix';

const nameExp = new RegExp(
  "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
);
const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const Contact = ({ contact }) => {
  //   console.log(contact);
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contactRedux = useSelector(getContacts);

  //   useEffect(() => {
  //     dispatch(fetchContacts());
  //   }, [dispatch]);

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const deleteHandler = event => {
    onDelete(contact.id);
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

  const onChange = (name, number) => {
    dispatch(editContact({ id: contact.id, name, number }));
  };

  const changeContactHandler = event => {
    const checkExist = contactRedux.some(
      elem => elem.name.toLowerCase() === state.name.toLowerCase()
    );
    const notChanged = contactRedux.some(
      elem => elem.name === state.name && elem.number === state.number
    );

    if (notChanged) {
      Notify.info('Save without changes!');
      setEdited(false);
      setAnchorEl(null);
      return;
    }

    if (checkExist) {
      Notify.info(`Contact ${state.name} is already exist! Write another one!`);
      setEdited(false);
      setAnchorEl(null);
      return;
    } else {
      event.preventDefault();
      console.log(state.name, state.number);
      console.log({ id: contact.id, name: state.name, number: state.number });
      onChange(state.name, state.number);
      setEdited(false);
      setAnchorEl(null);
    }
  };

  //----------------- start menu functions ----------------------//

  const StyledMenu = styled(props => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light'
          ? 'rgb(55, 65, 81)'
          : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //----------------- end menu functions ----------------------//

  const [edited, setEdited] = useState(false);


  const onClickEdit = event => {
    // if (edited === true) {
    //     Notify.info(`Another contact is editing, please finish that one.`);
    //     return
    // } else {
        setEdited(true);
        setState(prevState => {
          return { ...prevState, name: contact.name, number: contact.number };
        });
    // }

  };

  return (
    <>
      {edited !== true ? (
        <>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon color="primary" htmlColor="secondary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={contact.name}
            secondary={contact.number}
            sx={{ width: 184, maxWidth: 184 }}
          />

          <div>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Options
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                // onClick={{ handleOpenModal, handleClose }}
                onClick={onClickEdit}
                // onClick={onClickEdit(contacts.id, contacts.name, contacts.number)}

                disableRipple
              >
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem
                // onClick={() => {
                //   onDelete(contact.id);
                //   handleClose();
                // }}
                onClick={deleteHandler}
                disableRipple
              >
                <DeleteIcon />
                Delete
              </MenuItem>
            </StyledMenu>
          </div>
        </>
      ) : (
        <>
          <form className={css.Form} onSubmit={changeContactHandler}>
            <div className={css.Inputs}>
              <TextField
                hiddenLabel
                id="contact-input-name"
                type="text"
                name="name"
                label="Name"
                variant="outlined"
                value={state.name}
                pattern={nameExp}
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onInputChange}
              />
              <TextField
                hiddenLabel
                id="contact-input-phone"
                type="text"
                name="number"
                label="Phone"
                variant="outlined"
                value={state.number}
                pattern={phoneExp}
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onInputChange}
              />
            </div>
            <Button
                className={css.Button}
              id="contact-save-edition"
              type="submit"
              color="primary"
              onSubmit={changeContactHandler}
              startIcon={<Save />}
              variant="contained"
            >
              <span>save</span>
            </Button>
          </form>
        </>
      )}
    </>
  );
};
