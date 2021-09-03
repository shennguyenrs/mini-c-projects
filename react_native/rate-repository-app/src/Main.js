import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import components
import RepositoriesList from './screens/RepositoriesList';
// Old form
// import SignInForm from './screens/SignInForm';
import SignInFormik from './screens/SignInFormik';
import SignUpFormik from './screens/SignUpFormik';

//Import hooks
import useAuthStorage from './hooks/useAuthStorage';

// Import base style
import { colors } from './styles/base';

// Local styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});

// Global variables
const Tab = createBottomTabNavigator();

// Main Component
export default function Main() {
  const localStorage = useAuthStorage();
  console.log(localStorage.getAccessToken());

  const [token, setToken] = useState(null);

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Repositories') {
        iconName = focused ? 'albums' : 'albums-outline';
      } else if (route.name === 'Sign In') {
        iconName = focused ? 'log-in' : 'log-in-outline';
      } else if (route.name === 'Sign Up') {
        iconName = focused ? 'person-add' : 'person-add-outline';
      } else if (route.name === 'User') {
        iconName = focused ? 'person' : 'person-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors.blue,
    tabBarInactiveTintColor: colors.grey,
    tabBarItemStyle: {
      marginBottom: 5,
    },
    tabBarHideOnKeyboard: true,
  });

  const loginedTabs = () => {
    if (token) {
      return (
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Repositories" component={RepositoriesList} />
          <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
      );
    }

    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Repositories" component={RepositoriesList} />
        <Tab.Screen name="Sign In" component={SignInFormik} />
        <Tab.Screen name="Sign Up" component={SignUpFormik} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>{loginedTabs()}</View>
    </NavigationContainer>
  );
}
