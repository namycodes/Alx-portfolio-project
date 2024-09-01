const {AppError} = require("./errorController")
const jsonwebtoken = require('jsonwebtoken')
const User = require("../models/users")

const MAX_AGE = process.env.MAX_AGE

const Sign_JWT = async(_id:string)=>{
    return  await jsonwebtoken.sign({_id},process.env.JWT_SECRET_KEY,{
        expiresIn: MAX_AGE
    })
}


exports.SignUp = async(req: any,res: any,next:any)=>{
    const {username, firstname, lastname, email, password, confirmPassword,phone} = req.body
    try {
        const newUser = await User.create({
            username, firstname, lastname, email, password, confirmPassword,phone
        })
      
        return res.status(201).json({
            status:'success',
            message: "User Created Successfully",
            data:{
                newUser
            }
        })
    } catch (error:any) {
        return AppError(error,error.name)(req,res,next)
    }
}

exports.SignIn = async(req:any,res:any)=>{
    const {email, password} = req.body
    try{
        if(!email || !password){
            return res.status(403).json({
                status:'fail',
                message:'Email and Password is required'
            })
        }
    
        const App_User = await User.findOne({email}).select('+password')
        if(!App_User || !(await App_User.correctPassword(password, App_User.password))){
            return res.status(401).json({
                status:'fail',
                message:'Wrong Email or Password'
            })
        }
    
        const token = await Sign_JWT(App_User._id)
        res.status(200).json({
            status:'Success',
            token
        })
    }catch(err){
        return res.status(500).json({
            status:'fail',
            message:'Internal Server Error',
            
        })
    }
   
    
}