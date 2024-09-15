import mongoose from "mongoose"
import validator from "validator"

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain AtLeast 3 Characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must Contain AtLeast 3 Characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number must contain exact 10 digits!"],
        maxLength:[10,"Phone Number must contain exact 10 digits!"]
    },
    message:{
        type:String,
        required:true
    }
});

export const Message = mongoose.model('Message',messageSchema);