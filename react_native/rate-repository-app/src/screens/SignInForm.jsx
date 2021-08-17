import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';

import { view } from '../styles/base';

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {},
  button: {},
});

const SignInForm = () => {
  const [email, setEmail] = useState('Email');
  const [pw, setPw] = useState('Password');

  return (
    <View style={[view.container, styles.constainer]}>
      <View>
        <Icon name="email" type="material" />
        <TextInput style={styles.input} placeholder={email} />
      </View>
      <View>
        <TextInput style={styles.input} placeholder={pw} />
      </View>
      <Pressable>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
