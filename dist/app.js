import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/users', usersRoutes);
export default app;
