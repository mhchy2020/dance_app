import { ApiError } from "@/utils/ApiError";
import { tokenStorage } from "@/utils/getToken";
// import { getToken, storeTokens } from "@/utils/getToken";

const apiURL = "http://10.0.2.2:3000/api";
// const apiURL = "http://10.142.34.77:3000/api";

type requestOptions = {
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  body?: unknown;
  token?: string|null;
};

const fetchCall = async (route: string, options: requestOptions) => {
  const { method = "GET", body, token } = options;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(route, {
    method: method,
    headers: headers,
    ...(body !== undefined && body !== null
      ? {
          body: JSON.stringify(body),
        }
      : {}),
  });
  return response;
};

export const apiRequest = async <T>(
  route: string,
  options: requestOptions = {},
): Promise<T> => {

  console.log("[Calling route]:", route);

  let response = await fetchCall(`${apiURL}${route}`, options);
  console.log(response);

  let data = await response.json();
  console.log("[API_REQUEST_RESPONSE]", data);

  if (response.status === 401 && data.code === "ACCESS_TOKEN_EXPIRED") {
    console.log("access token has expired, getting a new one");

    const refreshToken = await tokenStorage.getRefreshToken();
    response = await fetchCall(`${apiURL}/auth/refresh`, {
      method: "POST",
      body: { refreshToken: refreshToken },
    });
    data = await response.json();

    if (response.status === 401 && data.code === "REFRESH_TOKEN_EXPIRED") {
      console.log("session expired");
      throw new ApiError(401, data.message, data.code);
    }

    tokenStorage.saveAccessToken(data.data.accessToken)
    tokenStorage.saveRefreshToken(data.data.refreshToken)

    //call the api again
    options = { ...options, token: data.data.accessToken };
    response = await fetchCall(`${apiURL}${route}`, options);
    data = await response.json();
    console.log(`${apiURL}${route}`, data);
  }

  if (!response.ok) {
    throw new ApiError(401, data.message);
  }

  return data;
};
