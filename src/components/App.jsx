import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Home } from 'pages/Home';
import { Registration } from 'pages/Registration';
import { Login } from 'pages/Login';
import { Contacts } from 'pages/Contacts';
import { Public } from './Routes/Public';
import { Private } from './Routes/Private';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRefresh } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/registration"
            element={
              <Public
                component={Registration}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={<Public component={Login} redirectTo="/contacts" />}
          />
          <Route
            path="/contacts"
            element={<Private component={Contacts} redirectTo="/login" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
