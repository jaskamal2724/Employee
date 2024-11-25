import { asynchandler } from "../utils/asynchandler.js";
import {ApiError}  from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { t_login } from "../models/AdminLoginSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const registerAdmin = asynchandler(async(req,res)=>{

    // get admin deatils for registration
    // check for empty fields 
    // then chekc for if admin already exists
    // save the admin in db 

    const {username, password} = req.body
    console.log(username)

    if([username, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const exists_admin = await t_login.findOne({username})

    if(exists_admin){
        res.status(400).json({ message: "admin already exists" });
        throw new ApiError(400,"Admin with this username already exists")

    }

    const admin = await t_login.create({
        username:username,
        password:password,
    })

    const createdAdmin = await t_login.findById(admin._id).select("-password")

    if(!createdAdmin){
        throw new ApiError("Error in user registration")
    }

    console.log(`User Created Successfully : ${createdAdmin.username}`)

    return res.status(201).json(
        new ApiResponse(200,createdAdmin,"Admin regsitered successfully")
    )
})

const signInAdmin = asynchandler(async(req, res)=>{
     
    const {username, password} = req.body
    const admin = await t_login.findOne({username})

    if(!admin){
        res.status(400).json({message:"user not found"})
        throw new ApiError(404, "User not found. Please register yourself")
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password)

    if(!isPasswordCorrect){
        res.status(400).json({message:"incorrect password"})
        throw new ApiError(400, "Please enter correct password")
    }

    const token = jwt.sign(
        {id : admin._id, username: admin.username},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )

    const refreshToken = jwt.sign(
        {id : admin._id, username: admin.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    
    
    // cookies can only be managed through server
    const options ={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accesToken",token,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,admin, "User logged-in successfully")
    )

})

export {registerAdmin, signInAdmin}