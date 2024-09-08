const Preferences  = require("../models/preferences")

exports.addPreferece = async(req,res)=>{
    const {currency} = await req.body
    const {userId} = await req.query
    try{
        const exists = await Preferences.findOne(userId)
        if(exists){
            const preferece = await Preferences.findOneAndUpdate(userId,{
                currency
            })
             
        return res.status(200).json({
            status:"success",
            message:'Updated Successfully'
        })
        }
        if(!exists){
            const preferece = await Preferences.create({
                currency,
                userId
            })
             
        return res.status(201).json({
            status:"success",
            data: preferece
        })
        }

       
    }catch(err){
        return res.status(500).json({
            status:"fail",
            message:'Internal Server Error',
            err
        })
    }
}

exports.getPreferences=async(req,res)=>{
    const {userId} = await req.query
    try{
        const preferences = await Preferences.find(userId)
        return res.status(200).json({
            status:'success',
            data:{
                preferences
            }
        })
    }catch(err){
        return res.status(500).json({
            status:"fail",
            message:'Internal Server Error',
            err
        })
    }
}