const mongoose = require('mongoose')

const PreferenceSchema = new mongoose.Schema({
    currency:{
        type:String
    },
    
})

const Preferences = mongoose.model('prefereces', PreferenceSchema)
module.exports = Preferences