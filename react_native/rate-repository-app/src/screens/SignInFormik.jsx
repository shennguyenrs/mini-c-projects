import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { View, TextInput, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Import styles
import { shadow, container, error } from '../styles/base';
import button from '../styles/button';
import input from '../styles/input';

// Import queries
import { LOGIN } from '../graphql/mutation';

// Import hooks
import useAuthStorage from '../hooks/useAuthStorage';

// Import utils
import * as tokenUtils from '../utils/tokenUtils';

const signInValidation = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Too short password')
    .max(16, 'Too long password'),
});

const SignInFormik = ({ setToken }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });
  const authStorage = useAuthStorage();

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      tokenUtils.writeTokenToLocal(authStorage, token);
    }
  }, [result.data]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signInValidation}
      onSubmit={(values, actions) => {
        login({
          variables: {
            email: values.email,
            password: values.password,
          },
        });

        // Reset form value
        actions.resetForm({
          email: '',
          password: '',
        });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={[container.center]}>
          <TextInput
            style={[input.container, shadow.shadow]}
            placeholder="Email"
            onChangeText={handleChange('email')}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <Text style={error.message}>{errors.email}</Text>
          ) : null}
          <TextInput
            style={[input.container, shadow.shadow]}
            placeholder="Password"
            onChangeText={handleChange('password')}
            value={values.password}
            secureTextEntry={true}
          />
          {errors.password && touched.password ? (
            <Text style={error.message}>{errors.password}</Text>
          ) : null}
          <Pressable
            onPress={handleSubmit}
            style={[button.container, shadow.shadow]}
          >
            <Text style={[button.text]}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInFormik;
