import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, view, shadow } from '../styles/base';

import Form from '../components/Form';

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
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
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.white,
    marginLeft: 5,
  },
  loading: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loadingText: {
    color: colors.grey,
    marginLeft: 10,
  },
});

const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState('Email');
  const [pw, setPw] = useState('Password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Turn on loading animate
    setIsLoading(true);

    // Clear input on submit
    setEmail('Email');
    setPw('Password');

    // Redirect to home
    navigation.navigate('Repositories');

    console.log(email, pw);

    // Turn off loading animation
    setIsLoading(false);
  };

  return (
    <View style={[view.container, styles.constainer]}>
      <TextInput
        style={[shadow.shadow, styles.input]}
        placeholder={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[shadow.shadow, styles.input]}
        placeholder={pw}
        secureTextEntry={true}
        onChangeText={(text) => setPw(text)}
      />
      <Pressable onPress={handleSubmit}>
        <View style={[shadow.shadow, styles.button]}>
          <Ionicons name="log-in-outline" color={colors.white} size={18} />
          <Text style={styles.buttonText}>Sign in</Text>
        </View>
      </Pressable>
      {isLoading ? (
        <View style={[styles.loading]}>
          <ActivityIndicator size="small" color={colors.blue} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : null}
      <Form />
    </View>
  );
};

export default SignInForm;
