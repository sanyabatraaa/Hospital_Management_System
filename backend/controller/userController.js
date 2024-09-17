import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,role}=req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !role){
        return next(new ErrorHandler("Please Fill All the Details!",400));
    }

    let user=await User.findOne({email})
    if(user) return next(new ErrorHandler("User Already Registered!",400));

    user= await User.create({firstName,lastName,email,phone,password,gender,dob,role});

    generateToken(user,"User Registered!",200,res);
})
    
export const login = catchAsyncErrors(async (req,res,next)=>{
    const {email, password, role}=req.body;
    if(!email || !password || !role ){
        return next(new ErrorHandler("Please Fill All the Details!",400));
    }

   
    const user= await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found",400));
    }

    generateToken(user,"User LoggedIn successfully",200,res);

});

export const addNewAdmin =catchAsyncErrors(async (req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob){
        return next(new ErrorHandler("Please Fill All the Details!",400));
    }

    const isRegistered =await User.findOne({email});

    if(isRegistered ){
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists.`,400))
    }

    const admin = await User.create({firstName,lastName,email,phone,password,gender,dob,role:"Admin"});

    generateToken(admin,"Admin Registered",200,res);
});

export const getAllDoctors= catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user= req.user;
    res.status(200).json({ 
        success:true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async (req,res,next)=>{
    res.status(200)
    .cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite:"None"
    })
    .json({
        success:true,
        message:"User LoggedOut Successfully!!"
    })
})

export const logoutPatient = catchAsyncErrors(async (req,res,next)=>{
    res.status(200)
    .cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite:"None"
    })
    .json({
        success:true,
        message:"User LoggedOut Successfully!!"
    })
})

export const addNewDoctor= catchAsyncErrors(async (req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor Avatar required!",400));
    }
    const {docAvatar}= req.files;
    const allowedFormats= ["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not supported",400))
    }
    const {firstName,lastName,email,phone,password,gender,dob,doctorDepartment}= req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !doctorDepartment){
        return next(new ErrorHandler("Please Fill All the Details!",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already exists with this email`,400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("Cloudinary Error:",cloudinaryResponse.error || "Unknown Clodinary Error")
    }

    const doctor = await User.create({
        firstName,lastName,email,phone,password,gender,dob,role:"Doctor",doctorDepartment,docAvatar:{
            public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
        }
    })
    generateToken(doctor,"New Doctor Registered!",200,res);

})