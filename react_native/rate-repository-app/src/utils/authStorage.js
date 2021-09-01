import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(`${this.namespace}:token`);

    return rawToken ? JSON.parse(rawToken) : null;
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(token)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}
