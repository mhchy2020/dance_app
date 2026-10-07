import { db } from '../../config/supabase.ts';

export const authRepository = {
    async createUser(id: string, name: string, email: string, hashed: string){
      // store user to db
        const query = `
        INSERT INTO users (id, name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email
        `
        const result = await db.query(query, [id, name, email, hashed]);
        return result.rows[0];
    },

    async findByEmail(email: string){
        const query = `
        SELECT id, email, password_hash, name
        FROM users 
        WHERE email = $1
        LIMIT 1   
        `
        const result = await db.query(query, [email])
        
        return result.rows[0] || null;
    }
}