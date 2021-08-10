import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

// Import hooks
import useField from '../hooks/useField';

// Import queries
import { SIGN_UP } from '../queries';

const SignUpForm = ({ show, setErr, setToken, changePage }) => {
  if (!show) return null;

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');
  const { reset: resetFavoriteGenre, ...favoriteGenre } = useField('text');
  const [signup, result] = useMutation(SIGN_UP, {
    onError: (err) => {
      setErr(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.createUser.value;
      setToken(token);
      localStorage.setItem('user-token', token);

      // Redirect to authors page
      changePage('authors');
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({
      variables: {
        username: username.value,
        password: password.value,
        favoriteGenre: favoriteGenre.value,
      },
    });

    // Clear form after sign up
    resetUsername();
    resetPassword();
    resetFavoriteGenre();
  };

  return (
    <>
      <h2>sign up form</h2>
      username: <input {...username} /> <br />
      password: <input {...password} /> <br />
      favorite genre: <input {...favoriteGenre} /> <br />
      <input value="sign up" type="button" onClick={handleSubmit} />
    </>
  );
};

export default SignUpForm;

// PropsTypes validation
SignUpForm.propTypes = {
  show: PropTypes.bool,
  setErr: PropTypes.func,
  setToken: PropTypes.func,
  changePage: PropTypes.func,
};
