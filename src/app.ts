import express, { Express } from 'express';
import usersRoutes from './routes/usersRoutes.js';

const app: Express = express();

app.use(express.json());

app.use('/users', usersRoutes);

export default app;