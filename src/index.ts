import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";

import {router as userRouter} from './routes/user';
import { router as viewsRouter } from "./routes/views";

config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || '';
const app: Application = express();

// const allowedOrigins = ['*'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };


app.use('/static', express.static('static'))
app.use(cors());
app.use(express.json());
app.use('/', viewsRouter);
app.use('/api/user', userRouter);

connect(DB_URI)
.then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`App running on PORT ${PORT}`);
    })
})