import bcrypt from 'bcrypt';
import { db } from '../../config/supabase.ts';
import { ApiError } from '../../utils/ApiError.ts';

type userType = {
    id: string,
    email: string, 
    password: string
}

const users: userType[] = [];

export const authRepository = {
    async createUser(id: string, email: string, hashed: string){
      // store user to db
        const query = `
        INSERT INTO users (id, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, email, created_at
        `
        const result = await db.query(query, [id, email, hashed]);
        return result.rows[0];
    },

    async findByEmail(email: string){
        const query = `
        SELECT id, email, password_hash
        FROM users 
        WHERE email = $1
        LIMIT 1   
        `
        const result = await db.query(query, [email])
        
        return result.rows[0] || null;
    }
}