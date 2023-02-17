import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

import {router as userRouter} from './routes/user';

config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || '';
const app: Application = express();



app.use(express.json())
app.use('/api/user', userRouter);

connect(DB_URI)
.then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`App running on PORT ${PORT}`);
    })
})