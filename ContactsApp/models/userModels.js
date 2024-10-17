const mongoose = require("mongoose");
 
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"pleae enter the username"]
    },
    email:{
        type:String,
        required:[true,"username reuired"],
        unique:[true,"email address already registerd"]
    },
    password:{
        type:String,
        required:[true,"please enter the user password"]
    }
})

module.exports = mongoose.model("User",userSchema)