import express from 'express';
import { router } from './route.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { ApiError } from './utils/ApiError.ts';

export const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.get('/error', (req, res)=>{
    throw new ApiError(404, 'This is a test error');
});


app.use('/api', router);
app.use(errorHandler);
