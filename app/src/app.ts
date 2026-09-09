import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 中间件
app.use(helmet());
app.use(cors());
app.use(express.json());

// 你的业务路由
// app.use('/api/users', userRoutes);

export default app;