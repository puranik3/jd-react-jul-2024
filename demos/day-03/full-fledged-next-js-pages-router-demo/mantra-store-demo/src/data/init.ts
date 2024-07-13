import mongoose from "mongoose";

// run the model files to generate the model
import "./models/Product";
import "./models/User";

export const connect = async () => {
    const connectionStr =
        process.env.DATABASE_CONNECTION_STRING ||
        "mongodb://localhost:27017/mantra";

    try {
        await mongoose.connect(connectionStr);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};

export const disconnect = async () => {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
};

connect();

export default mongoose;
