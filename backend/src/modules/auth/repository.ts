import bcrypt from 'bcrypt';

type userType = {
    id: string,
    email: string, 
    password: string
}

const users: userType[] = [];

export const authRepository = {
    async register(email: string, password: string){

        const hashed = await bcrypt.hash(password, 10);

        const user = {
            id: crypto.randomUUID(),
            email,
            password : hashed
        }
        users.push(user);
        return user;
    },
    async findByEmail(email: string){
        return users.find(u => u.email === email)
    }
}