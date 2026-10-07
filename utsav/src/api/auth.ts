import { apiRequest } from "./client";

export const login = async (email: string, password: string) => { 
    return apiRequest('/auth/login', {
        method: "POST",
        body: {
            email,
            password
        }
    });
}

export const register = async (name: string, email: string, password:string) => {
    return apiRequest("/auth/register", {
        method: "POST",
        body: {
            name,
            email,
            password
        }
    })
}