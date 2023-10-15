import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';
import { useAccount } from '../hooks/useAccount';
import { manageAccountAuth } from '../utils/crud';

function Logout() {
  const redirect = useNavigate();

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { account: authenticated } = useSelector(state => state.authentication);

  const { loading, setLoading, error, setError, account, setAccount } =
    useAccount();

  useEffect(() => {
    // can't logout when not logged in. redirect back
    if (!authenticated) redirect(-1);
    // user is logged in try logging them out
    else {
      manageAccountAuth({
        path: 'signout',
        setLoading,
        setError,
        setAccount,
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      setErrorMsg(error.message);
    }
    if (!error && account !== null) {
      setSuccessMsg('Successfully logged out');
      setTimeout(() => {
        redirect('/');
      }, 3000);
    }
  }, [account, error]);

  return (
    <main className='main'>
      {successMsg && <SuccessAlert message={successMsg} />}
      {errorMsg && <ErrorAlert message={errorMsg} />}
    </main>
  );
}

export default Logout;
