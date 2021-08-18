import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import components
import RepositoriesList from './screens/RepositoriesList';
import SignInForm from './screens/SignInForm';

import { colors } from './styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Repositories') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Sign In') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.blue,
            tabBarInactiveTintColor: colors.grey,
            tabBarItemStyle: {
              marginBottom: 5,
            },
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen name="Repositories" component={RepositoriesList} />
          <Tab.Screen name="Sign In" component={SignInForm} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
