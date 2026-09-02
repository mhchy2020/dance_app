import express from 'express';
import { router } from './route.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { ApiError } from './utils/ApiError.ts';
import { db } from './config/supabase.ts';

export const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.get('/error', (req, res)=>{
    throw new ApiError(404, 'This is a test error');
});

app.get("/users", async (req, res) => {

    try{
        const result = await db.query("SELECT * FROM users");
        console.log(result.rows);
        res.status(200).json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            data: {message: "db connection failed"}
        })
    }
    

});

app.use('/api', router);
app.use(errorHandler);
