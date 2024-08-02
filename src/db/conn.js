import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // NOTE: connectionInstance.connection.host is written since there can be many DBs, eg: for production, testing
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB CONNECTION FAILED ERROR: ", error);
        process.exit(1)
    }
}

export default connectDB