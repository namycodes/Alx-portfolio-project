const User = require("./models/users");
const m2s = require('mongoose-to-swagger');
module.exports =  {
    user: m2s(User)
}