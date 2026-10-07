//INITIALIZE a context using createContext();
// --> returns an object with provider and consumer components

import { apiRequest } from "@/api/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  authContextType,
  LoginResponse,
  RegisterResponse,
} from "@/types/user";

import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";

//CREATE a provider component
// --> this defines the variable or states that needs to be shared globally across the components
// --> returns a provider component with value={ {value here} }

//USE the component
//-> use the context to access the value shared using useContext();

const AuthContext = createContext<authContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    restoreSession();
    // getItems();
  }, []);

  const restoreSession = async () => {
    //get the items from asyncStorage
    try {
      const [user, accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("accessToken"),
        AsyncStorage.getItem("refreshToken"),
      ]);
      console.log("[ASYNC STORAGE USER]:", user);
      // if found -> set the user which sets is LoggedIn as true
      if (user && accessToken && refreshToken) {
        setUser(JSON.parse(user));
      }
    } catch (err) {
      console.log("[ASYNC STORAGE ERROR]", err);
    } finally {
      setIsloading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    const { user, accessToken, refreshToken } = response.data;

    await Promise.all([
      AsyncStorage.setItem("accessToken", accessToken),
      AsyncStorage.setItem("user", JSON.stringify(user)),
      AsyncStorage.setItem("refreshToken", refreshToken),
    ]);

    setUser(user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await apiRequest<RegisterResponse>("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    const { user } = response.data;
    setUser(user);
  };

  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem("accessToken"),
      AsyncStorage.removeItem("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: user !== null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return context;
}
