import mongoose from "mongoose";

// connection to DB

const connectDB = async () => {

    mongoose.connection.on('connected', ()=> console.log("Database connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/Job-portal`)

}

export default connectDB