import express, { Application, Request, Response } from "express";

import {router as userRouter} from './routes/user';

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json())
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})