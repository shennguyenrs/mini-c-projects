import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { colors, shadow } from '../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    width: 300,
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 4,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: colors.blue,
    borderRadius: 30,
    maxHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: colors.error,
  },
});

const signUpValidation = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Too short password')
    .max(16, 'Too long password'),
  confirmPass: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
});

const SignUpFormik = ({ navigation }) => (
  <Formik
    initialValues={{ email: '', password: '', confirmPass: '' }}
    validationSchema={signUpValidation}
    onSubmit={(values, actions) => {
      console.log(values);

      // Reset form value
      actions.resetForm({
        email: '',
        password: '',
        confirmPass: '',
      });

      // Navigate back to repositories
      navigation.navigate('Repositories');
    }}
  >
    {({ handleChange, handleSubmit, values, errors, touched }) => (
      <View style={[styles.container]}>
        <TextInput
          style={[styles.input, shadow.shadow]}
          placeholder="Email"
          onChangeText={handleChange('email')}
          value={values.email}
        />
        {errors.email && touched.email ? (
          <Text style={styles.errorMessage}>{errors.email}</Text>
        ) : null}
        <TextInput
          style={[styles.input, shadow.shadow]}
          placeholder="Password"
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry={true}
        />
        {errors.password && touched.password ? (
          <Text style={styles.errorMessage}>{errors.password}</Text>
        ) : null}
        <TextInput
          style={[styles.input, shadow.shadow]}
          placeholder="Confirm password"
          onChangeText={handleChange('confirmPass')}
          value={values.confirmPass}
          secureTextEntry={true}
        />
        {errors.confirmPass && touched.confirmPass ? (
          <Text style={styles.errorMessage}>{errors.confirmPass}</Text>
        ) : null}
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, shadow.shadow]}
        >
          <Text style={[styles.buttonText]}>Sign Up</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default SignUpFormik;
