const mongoose = require('mongoose')
const ExpensesSchema = new mongoose.Schema({
    title:{
        type: String,
        minlength: [3,"Title of expense should at least be 3 character long"],
        required:[true, "Title is a required field"]
    },
    income:{
        type: Number,
        required:[true, "Income is a required field"]
    },
    expenseAmount:{
        type: Number,
        required: [true, "Expense amount is a required field"]
    },
    dateOfExpense:{
        type: Date,
        required:[true, "The date of expense is required"]
    },
    description:{
        type: String,
        required: [true,"Description  is a required field"]
    },
    userId:{
        type:String,
        required:[true,'User id is required']
    }
},{
    timestamps: true
})




const Expenses = mongoose.model("expenes", ExpensesSchema)
module.exports = Expenses