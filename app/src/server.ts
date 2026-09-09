import app from './app';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    // 1.  Forest Admin Agent
    const agent = createAgent({
        authSecret: process.env.FOREST_AUTH_SECRET!,
        envSecret: process.env.FOREST_ENV_SECRET!,
        agentUrl: process.env.FOREST_AGENT_URL || `http://localhost:${PORT}`,
        typingsPath: './.forestadmin-schema.json',
    });


    agent.addDataSource(
        createSqlDataSource(process.env.DATABASE_URL!)
    );

    await agent.mountOnExpress(app);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`🌿 Forest Admin available on http://localhost:${PORT}/forest`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});