const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    firstName:{
        type:String ,
        trim: true ,
        required: true
    },
    lastName:{
        type:String ,
        trim: true ,
        required: true
    },
    email:{
        type: String ,
        required: true ,
        trime: true ,
        unique: true
    },
    password:{
        type: String ,
        required: true ,
        trime: true,
        minilength: 8 
    },
    isAdmin:{
        type:Boolean ,
        default: false
    },
    tokens:[{
        type:String ,
        expires:"2d",
        trim: true 
    }],
    image: {
        type: String ,
        trim: true

    }
    // role:{
    //     type: String,
    //     enum: ["user", "admin"]
    // }

})

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified("password")){
            return next()
        }
        this.password = await bcrypt.hash(this.password,8)
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User