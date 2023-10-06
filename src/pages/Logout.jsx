import React, { useEffect, useState } from 'react';
import { signout } from '../features/Auth/appAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';

function Logout() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { account, error, loading } = useSelector(
    state => state.authentication
  );

  useEffect(() => {
    (async () => {
      if (account) {
        // log account out from server
        dispatch(signout());
        // log account out from client
        // await dispatch(authenticate());
        // redirect after some time just to flash a message/alert
        setTimeout(() => {
          // redirect to
          if (account) {
            setSuccessMsg('Logged out successfully');
            redirect('/');
          }

          if (error) setErrorMsg(error.message);
        }, 5000);
      }
    })();
  }, [account, error]);
  return (
    <main className='main'>
      {successMsg && <SuccessAlert message={successMsg} />}
      {errorMsg && <ErrorAlert message={errorMsg} />}
    </main>
  );
}

export default Logout;
