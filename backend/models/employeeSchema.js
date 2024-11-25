import mongoose,{Schema} from "mongoose";

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true,
    },
    designation:{
        type:String,
        enum:["HR","Manager", "Sales"],
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female"],
        required:true,
    },
    course:{
        type:String,
        enum:["MCA","BCA","BSC"],
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    },
})

export const t_Employee = mongoose.model("t_Employee",employeeSchema)