import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, fetchSignUp } from 'redux/operations';
import { clearErrorOnUnmount } from 'redux/slices';
import { getAuthorizationError } from 'redux/selectors';
import { Notify } from 'notiflix';

import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import css from '../ContactForm/ContactForm.module.css';
// import { Login } from 'pages/Login';
import { Link } from 'react-router-dom';

// const nameExp = new RegExp(
//   "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
// );
// const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const RegisterForm = () => {
  const load = isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(clearErrorOnUnmount());
  }, [dispatch]);

  const isError = useSelector(getAuthorizationError);

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(state);
    // if (event.target.name === 'password' && event.target.value.length < 8){
    //   Notify.failure('Too much signs in number. Please, check the inputed value');
    // return
    // }

    if (state.password.length < 8) {
      Notify.failure('Password must be at least 8 characters without spaces.');
      return;
    }

    // if (isError) {
    //   Notify.warning(
    //     'The user with this email address is already registered. Try to login.'
    //   );
    // }

    dispatch(fetchSignUp(state));
    console.log(state);

    // dispatch(fetchSignUp(values));
  };

  const onInputChange = event => {
    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <form className={css.Form} onSubmit={onSubmitHandler}>
      <TextField
        id="register-input-name"
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        value={state.name}
        // pattern={nameExp}
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
        onChange={onInputChange}
      />
      <TextField
        id="register-input-email"
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        value={state.email}
        // pattern={phoneExp}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onInputChange}
      />

      <FormControl sx={{ width: '320px', margin: '0 auto' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="register-input-password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={state.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={onInputChange}
        />
      </FormControl>

      {/* {isError && Notify.warning("The user with this email address is already registered. Try to login.")} */}

      {isError && (
        <Typography color="red">
          The user with this email address is already exists. Please, try to{' '}
          <Link to="/login">login</Link>
        </Typography>
      )}

      {!isError && (
        <Typography color="blue">
          Already have an account? Try to <Link to="/login">login</Link>
        </Typography>
      )}

      <LoadingButton
        // className = {css.Button}
        type="submit"
        color="primary"
        onSubmit={onSubmitHandler}
        loading={load}
        loadingPosition="start"
        startIcon={<AddCircleIcon />}
        variant="contained"
      >
        <span>Sign up</span>
      </LoadingButton>
    </form>
  );
};
