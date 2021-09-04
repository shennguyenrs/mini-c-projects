import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Import styles
import { colors, shadow, container, error } from '../styles/base';
import button from '../styles/button';
import input from '../styles/input';

const signInValidation = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Too short password')
    .max(16, 'Too long password'),
});

const SignInFormik = ({ navigation }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={signInValidation}
    onSubmit={(values, actions) => {
      // Reset form value
      actions.resetForm({
        email: '',
        password: '',
      });

      // Navigate back to repositories
      navigation.navigate('Repositories');
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

export default SignInFormik;
