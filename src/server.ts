import app from './app';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;
const authSecret = process.env.FOREST_AUTH_SECRET;
const envSecret = process.env.FOREST_ENV_SECRET;

async function startServer() {
    // 创建 Forest Admin Agent
    createAgent({
        authSecret,
        envSecret,
        typingsPath: './.forestadmin-schema.json',
        isProduction: process.env.NODE_ENV === 'production',
        typingsMaxDepth: 5,

    })
        // 添加 SQLite 数据源（Forest Admin 会内省数据库结构）
        .addDataSource(createSqlDataSource(process.env.DATABASE_URL!))
        .mountOnExpress(app)
        .start();


    // 挂载 Forest Admin 路由到 Express


    // 启动服务
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🌿 Forest Admin available on http://localhost:${PORT}/forest`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});