import { asynchandler } from "../utils/asynchandler.js";
import {ApiError}  from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { t_Employee } from "../models/employeeSchema.js";
import { uploadoncloudinary } from "../cloudinary.js";

const createEmployee = asynchandler(async(req, res)=>{

    const {name, email, mobileNo, designation, gender, course} = req.body

    if([name, email, mobileNo, designation, gender, course].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const user = await t_Employee.findOne({email})

    if(user){
        throw new ApiError(400,`Employee with email : ${user.email} already exists`)
    }
   
    const profileImageLocalPath = req.files?.profileImage[0]?.path
   
    if(!profileImageLocalPath){
        throw new ApiError(400,"Profile image is required")
    }

    const profileImage = await uploadoncloudinary(profileImageLocalPath)

    const employee = await t_Employee.create({
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        profileImage: profileImage?profileImage.url:" ",
    })

    const  createEmployee = await t_Employee.findById(employee._id)

    if(!createEmployee){
        throw new ApiError(400,"Error while regsitering employee")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,createEmployee,"Employee regsitered successfully")
    )
})

const editEmployee = asynchandler(async(req, res)=>{

    const { email, updates } = req.body;

    const employee = await t_Employee.findOneAndUpdate(
      { email }, // Find the employee by email
      { $set: updates }, // Apply the updates to the document
      { new: true } // Return the updated document after applying the changes
    );
  
    if (!employee) {
      return res
        .status(404)
        .json(new ApiError(404, "Employee not found or could not be updated"));
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee details updated successfully"));

})

const deleteEmployee = asynchandler(async(req, res)=>{

    const {email} = req.body

    const employee = await t_Employee.deleteOne({email})
    if(!employee){
        return res
        .status(400)
        .json(
            new ApiError(400,"Not deleted")
        )
    }
    return res
    .status(201)
    .json(
        new ApiResponse(200,"deleted")
    )
})

const viewDetails = asynchandler(async(req, res)=>{

    const users = await t_Employee.find({})
    
    if(!users || users.length === 0){

        return res
        .status(404)
        .json(
            new ApiError(404,"no users found")
        )
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,users,)
    )
})

export {createEmployee, editEmployee, deleteEmployee, viewDetails}