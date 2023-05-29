import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";

import {router as userRouter} from './routes/user';

config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || '';
const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


app.use(express.static('static'))
app.use(cors(options));
app.use(express.json());
app.use('/api/user', userRouter);

connect(DB_URI)
.then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`App running on PORT ${PORT}`);
    })
})