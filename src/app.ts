import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth-route';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user-route';


const app = express();



// middleware
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

export default app