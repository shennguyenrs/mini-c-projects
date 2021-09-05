import React, { useEffect } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

// Import base style
import { shadow, container, error } from '../styles/base';
import button from '../styles/button';
import input from '../styles/input';

// Import queries
import { CREATE_USER } from '../graphql/mutation';

// Import hooks
import useAuthStorage from '../hooks/useAuthStorage';

// Import token utils
import * as tokenUtils from '../utils/tokenUtils';

// Sign up form validation
const signUpValidation = Yup.object().shape({
  username: Yup.string().required('Required').min(4, 'Too short'),
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Too short password')
    .max(16, 'Too long password'),
  confirmPass: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

// Sign up form component
const SignUpFormik = ({ setToken }) => {
  const [signup, result] = useMutation(CREATE_USER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });
  const authStorage = useAuthStorage();

  useEffect(() => {
    if (result.data) {
      const token = result.data.createUser.value;
      setToken(token);
      tokenUtils.writeTokenToLocal(authStorage, token);
    }
  }, [result.data]);

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', confirmPass: '' }}
      validationSchema={signUpValidation}
      onSubmit={(values, actions) => {
        signup({
          variables: {
            username: values.username,
            email: values.email,
            password: values.confirmPass,
          },
        });

        // Reset form value
        actions.resetForm({
          username: '',
          email: '',
          password: '',
          confirmPass: '',
        });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={[container.center]}>
          <TextInput
            style={[input.container, shadow.shadow]}
            placeholder="Username"
            onChangeText={handleChange('username')}
            value={values.username}
          />
          {errors.username && touched.username ? (
            <Text style={error.message}>{errors.username}</Text>
          ) : null}
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
          <TextInput
            style={[input.container, shadow.shadow]}
            placeholder="Confirm password"
            onChangeText={handleChange('confirmPass')}
            value={values.confirmPass}
            secureTextEntry={true}
          />
          {errors.confirmPass && touched.confirmPass ? (
            <Text style={error.message}>{errors.confirmPass}</Text>
          ) : null}
          <Pressable
            onPress={handleSubmit}
            style={[button.container, shadow.shadow]}
          >
            <Text style={[button.text]}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpFormik;
