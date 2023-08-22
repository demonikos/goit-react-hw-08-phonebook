import React, { useEffect, useState } from 'react';
import { fetchLogIn, isLoading } from 'redux/operations';

import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';

import css from '../ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorOnUnmount } from 'redux/slices';
import { getAuthorizationError } from 'redux/selectors';
import { Link } from 'react-router-dom';

// const nameExp = new RegExp(
//   "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
// );
// const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const LoginForm = () => {
  const load = isLoading;

  const [state, setState] = useState({
    // name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(clearErrorOnUnmount());
  }, [dispatch]);

  const isError = useSelector(getAuthorizationError);

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(state);

    dispatch(fetchLogIn(state));
    console.log(state);
  };

  const onInputChange = event => {
    // if (event.target.name === 'phone' && event.target.value.length > 16) {
    //   Notify.failure(
    //     'Too much signs in number. Please, check the inputed value'
    //   );
    //   return;
    // }

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
      {/* <TextField
        id="outlined-basic-name"
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        value={state.name}
        pattern={nameExp}
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
        onChange={onInputChange}
      /> */}
      <TextField
        id="login-input-email"
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
          id="login-input-password"
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

      {isError && (
        <Typography color="red">
          The email address or password is incorrect. Please check it or try to{' '}
          <Link to="/registration">join us</Link>
        </Typography>
      )}

      {!isError && (
        <Typography color="blue">
          Don't registered yet? Just join <Link to="/registration">us</Link>
        </Typography>
      )}

      <LoadingButton
        // className = {css.Button}
        type="submit"
        color="primary"
        onSubmit={onSubmitHandler}
        loading={load}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        variant="contained"
      >
        <span>Log in</span>
      </LoadingButton>
    </form>
  );
};
