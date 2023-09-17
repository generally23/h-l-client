import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';

import Home from './components/Home';
import PropertyDetail from './components/PropertyDetail';
import { authenticate, signout } from './features/Auth/accountsSlice';
import AccountDetail from './components/AccountDetail';
import CreateProperty from './components/CreateProperty';
import { setLocalAuth } from './utils';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  useEffect(() => {
    (async () => {
      const authenticated = await authenticate();
      console.log(authenticated);
      setLocalAuth(authenticated);
    })();
  });

  return (
    <div className='App' id='app'>
      {/* <Link to='/signup'>Sign Up</Link>
        <Link to='/signin'>Sign In</Link> */}

      {/* <a href='sms:+1234567890?body=Hello%20from%20my%20website!'>Send SMS</a> */}
      <Routes>
        {/* Property Routes */}
        <Route path='/'>
          {/* Home Page */}
          <Route index element={<Home />} />
          {/* Single Property Page */}
          <Route path=':propertyId' element={<PropertyDetail />} />
          {/* Create new Property Form */}
          <Route path='create' element={<CreateProperty />} />

          {/* Auth Routes */}
          {/* Signup Page */}
          <Route path='signup' element={<Signup />} />
          {/* Signin Page */}
          <Route path='signin' element={<Signin />} />

          {/* Account Routes */}
          <Route path='my-account'>
            {/* Account Page */}
            <Route index element={<AccountDetail />} />

            {/* Change Password */}
            <Route path='change-my-password' element={<ChangePassword />} />

            {/* Forgot Password */}
            <Route path='forgot-my-password' element={<ForgotPassword />} />

            {/* Reset Password */}
            <Route
              path='reset-my-password/:resetToken'
              element={<ResetPassword />}
            />
          </Route>
          {/* 404 Route */}
          <Route path='*' element={<div>not found 404</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
