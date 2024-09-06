const User = require("./models/users");
const Expenses = require("./models/expenses")
const m2s = require('mongoose-to-swagger');
module.exports =  {
    user: m2s(User),
    expenses: m2s(Expenses)
}