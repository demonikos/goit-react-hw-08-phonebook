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

export const LoginForm = () => {
  const load = isLoading;

  const [state, setState] = useState({
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
          Don't registered yet? Just <Link to="/registration">join us</Link>
        </Typography>
      )}

      <LoadingButton
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
