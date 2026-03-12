import { ApiError } from "../../utils/ApiError.ts";
import { generateToken } from "../../utils/token.ts";
import { authRepository } from "./repository.ts"

export const authService = {
    async register(email: string, password: string){

        const userFound = await authRepository.findByEmail(email);

        if(userFound){
            throw new ApiError(404, "user already exists");
        }
            const user = await authRepository.register(email, password);
            return { message: "user successfully registered"};
    },
    async login(email: string, password: string){
        // find user in the db
        const user = await authRepository.findByEmail(email);

        if(!user){
            throw new ApiError(400, "user not found. Register first")
        }

        // return with access and refresh token
        const accessToken = generateToken.access(user.id)
        const refreshToken = generateToken.refresh(user.id);

        return {accessToken, refreshToken};
    }
}