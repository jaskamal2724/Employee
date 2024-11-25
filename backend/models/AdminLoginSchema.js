import mongoose,{ Schema} from "mongoose";
import bcrypt from "bcryptjs"

const AdminloginSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:[true, "password is reqired"]
    }
},{timestamps:true})

AdminloginSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})



export const t_login = mongoose.model("t_login",AdminloginSchema)