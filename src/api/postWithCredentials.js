import { getAuth } from 'firebase/auth';

export const postWithCredentials = async (url, bodyData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not logged in');
    }

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(bodyData),
      headers: {
        AuthToken: await user.getIdToken(),
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Request Failed');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
