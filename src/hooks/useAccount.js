import { useState } from 'react';

export const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  return {
    loading,
    setLoading,
    account,
    setAccount,
    error,
    setError,
  };
};

export const useAccountPost = () => {};
