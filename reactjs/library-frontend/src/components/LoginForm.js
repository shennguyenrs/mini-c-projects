import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useLazyQuery } from '@apollo/client';

// Import Hooks
import useField from '../hooks/useField';

// Import queries
import { LOGIN, CURRENT_USER } from '../queries';

const LoginForm = ({
  show,
  setErr,
  setToken,
  changePage,
  setFavoriteGenre,
}) => {
  if (!show) return null;

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');
  const [getUser, { data }] = useLazyQuery(CURRENT_USER);

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      setErr(err.graphQLErrors[0].message);
    },
    update: (store) => {
      try {
        const dataInStore = store.readQuery({ query: CURRENT_USER });

        console.log(data);
        setFavoriteGenre(data.me.favoriteGenre);

        store.writeQuery({
          query: CURRENT_USER,
          data: {
            ...dataInStore,
            me: { ...data },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Set token once user login
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);

      // Redirect to authors
      changePage('authors');
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      variables: { username: username.value, password: password.value },
    });

    getUser();

    // Reset field after login
    resetUsername();
    resetPassword();
  };

  return (
    <>
      <h2>login form</h2>
      username: <input {...username} /> <br />
      password: <input {...password} /> <br />
      <input value="login" type="button" onClick={handleSubmit} />
    </>
  );
};

export default LoginForm;

// PropsTypes validation
LoginForm.propTypes = {
  show: PropTypes.bool,
  setErr: PropTypes.func,
  setToken: PropTypes.func,
  changePage: PropTypes.func,
  setFavoriteGenre: PropTypes.func,
};
