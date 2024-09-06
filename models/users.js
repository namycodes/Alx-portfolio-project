const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const UserModel = new mongoose.Schema({
    username:{
        type: String,
        required:[true, 'username is required'],
        minlength:[3,"username should at least be 3 characters or more"],
        unique:[true,'username already exists please use another username!!']
    },
    firstname:{
        type: String,
        required: [true,'Firsname is required'],
        minlength:[3, "Firstname should be at least 3 characters long"]
    },
    lastname:{
        type: String,
        required: [true,'Lastname is required'],
        minlength:[3, "Lastname should be at least 3 characters long"]
    },
    email:{
        type: String,
        unique: [true,"Email address already exists"]
    },
    phone:{
        type:String,
        required: [true,"Phone number is required"]
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        select: false,
        minlength: [8,"password should be at least 8 characters and above"]
    },
    confirmPassword:{
        type: String,
        required:[true, "Confirm password is required"],
        minlength: [8,"Confirm password should be at least 8 characters and above"],
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:"Passwords do not match"
        }
    },
    passwordChangedAt: Date

})

UserModel.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
})

UserModel.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

UserModel.methods.changedPasswordAfter=async function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10)
        return JWTTimestamp < changedTimeStamp
    }
    return false
}

const User = mongoose.model('user', UserModel)
module.exports  = User