import express, { Express } from 'express';
import usersRoutes from './routes/usersRoutes.js';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRoutes);

export default app;