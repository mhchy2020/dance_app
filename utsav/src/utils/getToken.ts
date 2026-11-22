import * as SecureStore from 'expo-secure-store';


export const tokenStorage = {
  async getAccessToken() {
    return SecureStore.getItemAsync("accessToken");
  },
  async saveAccessToken(value: string) {
    await SecureStore.setItemAsync("accessToken", value);
  },
  async getRefreshToken() {
    return SecureStore.getItemAsync("refreshToken");
   
  },
  async saveRefreshToken(value: string) {
    await SecureStore.setItemAsync("refreshToken", value);
  },
  async deleteTokens() {
    await Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
    ]);
  },
};