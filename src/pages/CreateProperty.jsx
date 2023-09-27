import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePropertyForm from '../features/Properties/Forms/Post/CreatePropertyForm';
import ErrorAlert from '../customComponents/ErrorAlert';
import Header from '../customComponents/Header';
import { useSelector } from 'react-redux';

function CreateProperty() {
  const { account, loading, error } = useSelector(
    state => state.authentication
  );

  console.log(account, loading, error);

  const redirect = useNavigate();

  const [type] = useState('land');

  const [errorMessage, setErrorMessage] = useState('');

  // this user is auth but not allowed
  const notAllowed = account && !account.verified;

  useEffect(() => {
    // if account is not authenticated redirect to signin
    if (!account && error) redirect('/signin');

    // if account is auth but not verified show alert
    if (notAllowed) {
      setErrorMessage(
        "Il n'est pas permis de cree un post sans verfie son compte"
      );
    }
  }, [account, error]);

  return (
    <>
      {notAllowed && <ErrorAlert message={errorMessage}></ErrorAlert>}
      {account && account.verified && <CreatePropertyForm type={type} />}
    </>
  );
}

export default CreateProperty;
