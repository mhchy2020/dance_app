export type User = {
  id: string;
  name: string;
  email: string;
};

export type authContextType = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type apiResponse<T> = {
  data: T;
  success: boolean;
};

export type LoginData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterData = {
  message: string;
  user: User;
};

export type refreshData = {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = apiResponse<LoginData>;
export type RegisterResponse = apiResponse<RegisterData>;
export type refreshResponse = apiResponse<refreshData>
