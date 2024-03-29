import { User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { hasspassword,comparePassword } from "../helper/auth.js";

export const registerUser = async (req, res) => {

    // get user details from frontend
     // validation - not empty
     // check if user already exists: username, email
     // check for images, check for avatar
     // upload them to cloudinary, avatar
     // create user object - create entry in db
     // remove password and refresh token field from response
     // check for user creation
     // return res
     try{
      const {name,email,password}=req.body;
      if(!name){
        return res.json({
            error:"name is required"
        })
      }
      if(!email){
        return res.json({
            error:"email is required"
        })
      }
      if(!password){
        return res.josn({
            error:"password is required at least 6 character"
        })
      };
      

      const exist=await User.findOne({email});
      if(exist){
        return res.json({
            error:"email is already used"
        })
      }
    //  const hashedPassword=await hasspassword(password);

      const user=await User.create({
        name,
        email,
        password
      })

      const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
      return res.json({
        error:"Something happned wrong when use registering"
    })
    }
   
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
     }
     
     catch(error){
      return res.json({
        error:"Something is wrong try again"
    })
     }    
 }

 export const loginUser =async(req,res)=>{
    const {email,password}=req.body;
   
    if(!email){
      return res.json({
          error:"email is required"
      })
    }
    if(!password){
      return res.json({
          error:"password is required "
      })
    };

    const user= await User.findOne({email});

    if(!user){
      return res.json({
        error:"no user registered for this email"
    })
    }

    if(user.password===password){
      return res.status(201).json(
        new ApiResponse(200, user, "User login Successfully")
    )
    }
    else{
      return res.json({
        error:"paasword in incorrect"
    })
     
    }


  }
 
 

 