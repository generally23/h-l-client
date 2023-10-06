import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CreatePropertyForm from '../features/Properties/Forms/Post/CreatePropertyForm';
import ErrorAlert from '../customComponents/ErrorAlert';
import { useSelector } from 'react-redux';

function CreateProperty() {
  const { account, loading, error } = useSelector(
    state => state.authentication
  );

  console.log(account, loading, error);

  const redirect = useNavigate();
  const [searchParams] = useSearchParams();

  const [type] = useState(searchParams.get('type') || 'house');

  const [errorMessage, setErrorMessage] = useState('');

  // this user is auth but not allowed
  const notAllowed = account && !account.verified;

  useEffect(() => {
    // if account is not authenticated redirect to signin
    if (!account && error) redirect('/signin');

    // if account is auth but not verified show alert
    if (notAllowed) {
      setErrorMessage(
        `Vous devez verifier votre compte pour pouvoir posté une propriété`
      );
      setTimeout(() => {
        redirect('/my-account');
      }, 3000);
    }
  }, [account, error]);

  return (
    <main className='main'>
      {notAllowed && <ErrorAlert message={errorMessage}></ErrorAlert>}
      {account && account.verified && <CreatePropertyForm type={type} />}
    </main>
  );
}

export default CreateProperty;
