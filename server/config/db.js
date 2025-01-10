import mongoose from "mongoose";

// connection to DB

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database connected"));
      
        await mongoose.connect(`${process.env.MONGODB_URI}/Job-portal`);
        
    } catch (error) {
        console.log(error)
        
    }
};

export default connectDB;
