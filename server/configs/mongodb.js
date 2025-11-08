import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async ()=>{
    mongoose.connection.on("connected", ()=>{
        console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/IntegralsDB`);
}
export default connectDB;