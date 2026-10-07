import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

type tokenType = "accessToken" | "refreshToken";

type storeItems = {
  accessToken: string,
  refreshToken: string,
  user?: User
}

export const storeTokens = async (storeItems: storeItems) => {
  
  await Promise.all([
    AsyncStorage.setItem("accessToken", storeItems.accessToken),
    AsyncStorage.setItem("refreshToken", storeItems.refreshToken),
    ]);
}

export const getToken = async (tokenType: tokenType): Promise<string> => {
  const token = await AsyncStorage.getItem(tokenType);
  if (!token) {
    throw new Error("tokens not found");
  }
  return token;
};

export const removeTokens = async () => {
  await Promise.all([
    AsyncStorage.removeItem("accessToken"),
    AsyncStorage.removeItem("refreshToken"),
    AsyncStorage.removeItem("user"),
  ]);
};