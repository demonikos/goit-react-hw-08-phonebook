// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// import css from './App.module.css';
// import { RegisterForm } from './RegisterForm/RegisterForm';
// import { LoginForm } from './LoginForm/LoginForm';
// import { AppBar } from '@mui/material';

import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import {Home} from 'pages/Home';
import {Registration} from 'pages/Registration';
import {Login} from 'pages/Login';
import {Contacts} from 'pages/Contacts';
import { Public } from './Routes/Public';
import { Private } from './Routes/Private';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRefresh } from 'redux/operations';

// import { Public } from './Routes/Public';
// import { Private } from './Routes/Private';


export const App = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchRefresh())
  }, [dispatch])

  return (
    // <>
    //   <div className={css.Container}>
    //     <Layout />
    //     <h1 className={css.H1}>Phonebook</h1>
    //     <ContactForm />
    //     <h2 className={css.H2}>Contacts</h2>
    //     <Filter />
    //     <ContactList />

    //     <h2 className={css.H2}>Register</h2>
    //     <RegisterForm />

    //     <h2 className={css.H2}>Login</h2>
    //     <LoginForm />
    //   </div>
    // </>

<>
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route
      path="/registration"
      element={
        <Public component={Registration} redirectTo='/contacts'
      // <Registration />
      />
    }
    />
    <Route
      path="/login"
      element={
        <Public component={Login} redirectTo='/contacts'
      // <Login />
      />
    }
    />
    <Route
      path="/contacts"
      element={
        <Private component={Contacts} redirectTo='/login'
      // <Contacts/>
      />
    }
    />
  </Route>
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
</>
  );
};