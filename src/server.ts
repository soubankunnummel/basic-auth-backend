import app from "./app";
import connectDB from "./config/db";
import { serverConfig } from "./config/intex";





const start  = () => {
    connectDB();
    try {
        app.listen(serverConfig.port, () => {
            console.log(`server started on port ${serverConfig.port}`);
        });
    } catch (error) {
        console.error('server error:', error);
        process.exit(1);
    } 
}

start();