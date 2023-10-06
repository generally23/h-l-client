import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessAlert from '../customComponents/SuccessAlert';
import ErrorAlert from '../customComponents/ErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { verifyMyAccount } from '../features/Auth/accountsSlice';

function VerifyAccount() {
  const { verificationCode } = useParams();

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const redirect = useNavigate();

  const { loading, error } = useSelector(state => state.account);

  const { account } = useSelector(state => state.authentication);

  const dispatch = useDispatch();

  console.log('verifying...');

  useEffect(() => {
    // authentication failed redirect to signin
    if (!account && error) redirect('/signin');

    if (account && account.verified) {
      setErrorMsg('Votre compte est déja verifié');
      setTimeout(() => {
        redirect('/');
      }, 3000);
    }

    if (account && !account.verified) {
      dispatch(
        verifyMyAccount({
          url: `http://localhost:9090/api/v1/accounts/verify/${verificationCode}`,
        })
      );
    }
  }, [account, error]);

  console.log(verificationCode);
  return (
    <main className='main'>
      {loading && 'Verifying you...'}
      {successMsg && <SuccessAlert message={successMsg} />}
      {errorMsg && <ErrorAlert message={errorMsg} />}
    </main>
  );
}

export default VerifyAccount;
