import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import { authenticate } from './features/Auth/appAuthSlice';
import AccountDetail from './pages/AccountDetail';
import CreateProperty from './pages/CreateProperty';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Test from './pages/Test';
import VerifyAccount from './pages/VerifyAccount';
import Logout from './pages/Logout';
import { useDispatch } from 'react-redux';
import Footer from './customComponents/Footer';
import Header from './customComponents/Header';
import UpdateProperty from './pages/UpdateProperty';

function App() {
  // delete auth status make sure user authenticate
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(authenticate());
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='App' id='app'>
      <Header />
      {/* <Link to='/signup'>Sign Up</Link>
        <Link to='/signin'>Sign In</Link> */}

      {/* <a href='sms:+1234567890?body=Hello%20from%20my%20website!'>Send SMS</a> */}

      <Routes>
        {/* Property Routes */}
        <Route path='/'>
          {/* Test Page */}
          <Route path='test' element={<Test />} />

          {/* Home Page */}
          <Route index element={<Home />} />
          {/* Single Property Page */}
          <Route path=':propertyId' element={<PropertyDetail />} />
          {/* Create new Property Form */}
          <Route path='create' element={<CreateProperty />} />
          {/* Update Property */}
          <Route path=':propertyId/update' element={<UpdateProperty />} />

          {/* Auth Routes */}

          {/* Signup Page */}
          <Route path='signup' element={<Signup />} />

          {/* Signin Page */}
          <Route path='signin' element={<Signin />} />

          {/* Logout Page */}
          <Route path='signout' element={<Logout />} />

          {/* Forgot Password */}
          <Route path='forgot-password' element={<ForgotPassword />} />

          {/* Reset Password */}
          <Route
            path='reset-password/:resetToken'
            element={<ResetPassword />}
          />

          {/* Verify */}
          <Route
            path='verify/:verificationCode'
            element={<VerifyAccount />}
          ></Route>

          {/* Account Routes */}
          <Route path='my-account'>
            {/* Account Page */}
            <Route index element={<AccountDetail />} />

            {/* Change Password */}
            <Route path='change-my-password' element={<ChangePassword />} />
          </Route>

          {/* 404 Route */}
          <Route path='*' element={<div>not found 404</div>} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
