import React from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';

const Form = () => (
  <Formik
    initialValues={{ email: 'Email', password: 'Password' }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleSubmit, values }) => (
      <View>
        <TextInput
          placeholder={values.email}
          onChangeText={handleChange('email')}
          value={values.email}
        />
        <TextInput
          placeholder={values.password}
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry={true}
        />
        <Pressable onPress={handleSubmit}>
          <Ionicons name="log-in-outline" />
          <Text value="Sign In" />
        </Pressable>
      </View>
    )}
  </Formik>
);

export default Form;
