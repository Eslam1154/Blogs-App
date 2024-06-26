const User = require("../models/user.model")
const loggerEvent = require("../services/logger.service")
const logger = loggerEvent("auth")
// const auth = require("../middelware/auth.middleware")
const bcrypt = require("bcryptjs")

const userController= {
    deleteUser:async (req,res)=>{
        try {
            logger.info(req.params)
            let {id} =req.params
            await User.findByIdAndDelete(id)
            res.send({
                message:"Account deleted !!"
            })
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    updateUser: async (req,res)=>{
        try {
            if(req.file){
                var image = `/api/user/${req.file.filename}`
            }
            let user = await User.findByIdAndUpdate(req.user._id,{...req.body,image} , {new:true})
            res.send(user)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    updatePassword:async (req,res)=>{
        try {
            let {newPassword , oldPassword} = req.body

            let user = await User.findById(req.user._id)

            let validPassword = await bcrypt.compare(oldPassword,user.password)
            if(!validPassword){
                return res.status(403).send({message:"Invalid old password"})
            }

            user.password = newPassword
            await user.save()
            res.send({message:"Password Updated !!"})
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    getUser : async(req,res)=>{
        try {
            let user = await User.findById(req.user._id)
            res.send(user)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    }
}


module.exports = userController