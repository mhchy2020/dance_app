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
import {
  User,
  authContextType,
  LoginResponse,
  RegisterResponse,
  userProfileResponse,
} from "@/types/apiResponseTypes";

import { router } from "expo-router";
import { tokenStorage } from "@/utils/getToken";

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
    const fetchUser = async () => {
      try {
        // const token = await getToken("accessToken");
        const token = await tokenStorage.getAccessToken();
        if (!token) {
          return;
        }

        const response = await apiRequest<userProfileResponse>("/auth/me", {
          method: "GET",
          token: token,
        });
        const { user } = response.data;
        setUser(user);
      } catch (err) {
        console.log("Failed to fetch user", err);
      } finally {
        setIsloading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    const { user, accessToken, refreshToken } = response.data;

    tokenStorage.saveAccessToken(accessToken);
    tokenStorage.saveRefreshToken(refreshToken);
    setUser(user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await apiRequest<RegisterResponse>("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    const { user, tokens } = response.data;

    await Promise.all([
      tokenStorage.saveAccessToken(tokens.accessToken),
      tokenStorage.saveRefreshToken(tokens.refreshToken),
    ]);

    setUser(user);
  };

  const logout = async () => {
    tokenStorage.deleteTokens();
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
