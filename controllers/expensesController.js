const Expenses = require("../models/expenses")
const AppFeatures = require('../utils/appFeatures')
exports.getAllUserExpenses=async(req,res)=>{
    const {userId} = req.params
    try{
        const AppFeature = new AppFeatures(Expenses.find({userId}), req.query).paginate().sort()
        const expenses = await  AppFeature.query
        return res.status(200).json({
            status:'success',
            data:{
                expenses
            }
        })
    }catch(error){
        return res.status(500).json({
            status:'fail',
            message:'Internal Server Error',
            error
        })
    }
    
}

exports.createExpense=async(req,res)=>{
    const {title,expenseAmount,dateOfExpense,description} = req.body
    const {userId} = req.params
    try{
        if(!userId){
            return res.status(403).json({
                status:'fail',
                message: "user id is required"
            })
        }
        const newExpense = await Expenses.create({
            title,expenseAmount,dateOfExpense,description,userId
        })
        return res.status(201).json({
            status:'Expense created successfully',
            data:{
                newExpense
            }
        })
    }catch(error){
        return res.status(500).json({
            status:'fail',
            message: "Internal server Error",
            error
        })
    }
}
