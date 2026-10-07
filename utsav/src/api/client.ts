import { ApiError } from "@/utils/ApiError";
import { getToken } from "@/utils/getToken";

const apiURL = "http://10.0.2.2:3000/api";

type requestOptions = {
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  body?: unknown;
  token?: string;
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
  // const { method = "GET", body, token } = options;
  // const response = await fetch(`${apiURL}${route}`, {
  //     method,
  //     headers: {
  //         "Content-Type": "application/json",
  //         ...(token ? {
  //             Authorization: `Bearer ${token}`
  //         } : {})
  //     },
  //     ...(body !== undefined && body !== null ? {
  //         body: JSON.stringify(body)
  //     } : {})
  // })

  let response = await fetchCall(`${apiURL}${route}`, options);

  let data = await response.json();
  console.log("[API_REQUEST]", data);

  if (response.status === 401 && data.code === "ACCESS_TOKEN_EXPIRED") {
    console.log("access token has expired, getting a new one");

    const refreshToken = await getToken("refreshToken");
    response = await fetchCall(`${apiURL}/auth/refresh`, {
      method: "POST",
      body: { refreshToken: refreshToken },
    });
    data = await response.json();

    if (response.status === 401 && data.code === "REFRESH_TOKEN_EXPIRED") {
      console.log("session expired");
      throw new ApiError(401, data.message, data.code);
    }
  }

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
