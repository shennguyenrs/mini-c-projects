import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';

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
    marginBottom: 20,
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
  },
});

const FormikComponent = ({
  placeholderEmail,
  placeholderPass,
  toChangeEmail,
  toChangePassword,
  toSubmit,
}) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleSubmit, values }) => (
      <View style={[styles.container]}>
        <TextInput
          style={[styles.input, shadow.shadow]}
          placeholder={placeholderEmail}
          onChangeText={handleChange('email')}
          value={values.email}
        />
        <TextInput
          style={[styles.input, shadow.shadow]}
          placeholder={placeholderPass}
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry={true}
        />
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, shadow.shadow]}
        >
          <Ionicons name="log-in-outline" size={18} color={colors.white} />
          <Text style={[styles.buttonText]}>Sign In</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default FormikComponent;
