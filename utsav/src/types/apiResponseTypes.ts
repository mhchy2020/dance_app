export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin"|"user"
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
  tokens: {
    accessToken: string, 
    refreshToken: string
  }
  user: User;
};

export type refreshData = {
  accessToken: string;
  refreshToken: string;
}

export type userProfileData = {
  user: User
};

export type eventsData = {
  title: string;
  event_date: string;
  start_time: string;
  location: string;
  description: string;
};

export type LoginResponse = apiResponse<LoginData>;
export type RegisterResponse = apiResponse<RegisterData>;
export type refreshResponse = apiResponse<refreshData>
export type userProfileResponse = apiResponse<userProfileData>;
export type getEventsResponse = apiResponse<eventsData[]>;