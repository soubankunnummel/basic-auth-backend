
//db connection

import mongoose from 'mongoose';
import { serverConfig } from './intex';


const connectDB = async () => {
    try {
        await mongoose.connect(serverConfig.db, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;