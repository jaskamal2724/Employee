import { v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET 
});

const uploadoncloudinary = async(Localfilepath)=>{
    try {
        if(!Localfilepath) return null 

        const response = await cloudinary.uploader.upload(Localfilepath ,{
            resource_type:"auto"
        })
        // file uploaded success
        // console.log("file uploaded successfully",response.url); 
        fs.unlinkSync(Localfilepath)
        return response
    } 
    catch (error) {
        fs.unlinkSync(Localfilepath) // remove locally saved temp file as the upload got failed
    }
}

export {uploadoncloudinary}
