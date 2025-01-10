import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    image:{type:String, default:""},
    resume:{type:String, default:""},
})


const User = mongoose.model("User", userSchema)

export default User