import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export const useProtectedFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error('User not logged in');
        }

        const response = await fetch(url, {
          headers: {
            AuthToken: await user.getIdToken(),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setData(data);
        } else {
          throw new Error('Unable to fetch data');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setData({});
      }
    };

    loadData();
  }, [url]);

  return { isLoading, data, setData };
};
