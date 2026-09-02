import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/token.ts";
import { authRepository } from "./repository.ts"
import { ApiError } from '../../utils/ApiError.ts';
import { db } from '../../config/supabase.ts';

export const authService = {
    async register(email: string, password: string){

        const existingUser = await authRepository.findByEmail(email);
        if(existingUser){
            throw new ApiError(404, "user already exists");
        }
   
        const hashed = await bcrypt.hash(password, 10);
        const id = crypto.randomUUID();

        const user = await authRepository.createUser(id, email, hashed);
       
        return { 
            message: "user successfully registered",
            user
        };
    },
    async login(email: string, password: string){
        
        const user = await authRepository.findByEmail(email);
        if(!user){
            throw new ApiError(404, "user not found, register first");
        }

        const isvalid = await bcrypt.compare(password, user.password_hash)

        if(!isvalid){
            throw new ApiError(404, "Invalid Credentials")
        }

        // return with access and refresh token
        const accessToken = generateToken.access(user.id)
        const refreshToken = generateToken.refresh(user.id);

        return {accessToken, refreshToken};
    }
}