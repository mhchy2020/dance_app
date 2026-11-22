import express, { type Request, type Response } from 'express';
import { router } from './route.ts';
import { errorHandler } from './middleware/errorHandler.ts';
export const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response, ) => { 
    return res.status(200).json({
        message: "welcome to the academy"
    })
})

app.use('/api', router);
app.use(errorHandler);
