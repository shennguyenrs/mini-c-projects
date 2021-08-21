import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import { colors, view, shadow } from '../styles/base';

import FormikComponent from '../components/FormikComponent';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '80%',
//     backgroundColor: colors.white,
//     marginBottom: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 4,
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'row',
//     marginTop: 10,
//     fontWeight: 'bold',
//     backgroundColor: colors.blue,
//     borderRadius: 30,
//     maxHeight: 40,
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//   },
//   buttonText: {
//     color: colors.white,
//     marginLeft: 5,
//   },
//   loading: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   loadingText: {
//     color: colors.grey,
//     marginLeft: 10,
//   },
// });

const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState('Email');
  const [pw, setPw] = useState('Password');
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Turn on loading animate
    // setIsLoading(true);

    // Clear initial states on submit
    setEmail('Email');
    setPw('Password');

    // Redirect to home
    navigation.navigate('Repositories');

    // Turn off loading animation
    // setIsLoading(false);
  };

  // Old form
  // return (
  //   <View style={[view.container, styles.container]}>
  //     <TextInput
  //       style={[shadow.shadow, styles.input]}
  //       placeholder={email}
  //       onChangeText={(text) => setEmail(text)}
  //     />
  //     <TextInput
  //       style={[shadow.shadow, styles.input]}
  //       placeholder={pw}
  //       secureTextEntry={true}
  //       onChangeText={(text) => setPw(text)}
  //     />
  //     <Pressable style={[shadow.shadow, styles.button]} onPress={handleSubmit}>
  //       <Ionicons name="log-in-outline" color={colors.white} size={18} />
  //       <Text style={styles.buttonText}>Sign in</Text>
  //     </Pressable>
  //     {isLoading ? (
  //       <View style={[styles.loading]}>
  //         <ActivityIndicator size="small" color={colors.blue} />
  //         <Text style={styles.loadingText}>Loading...</Text>
  //       </View>
  //     ) : null}
  //   </View>
  // );

  return (
    <FormikComponent
      placeholderEmail={email}
      placeholderPass={pw}
      toChangeEmail={(email) => setEmail(email)}
      toChangePassword={(pass) => setPw(pass)}
      toSubmit={handleSubmit}
    />
  );
};

export default SignInForm;
