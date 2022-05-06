const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        requiered:true


    },
    birthday:{ 
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Friend',friendSchema)