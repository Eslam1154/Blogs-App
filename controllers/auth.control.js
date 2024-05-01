const User = require("../models/user.model")
const loggerEvent = require('../services/logger.service')
const logger = loggerEvent("auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const userController= {
    newUser: async(req, res)=>{
        try{
            logger.info(req.body)
            let data = req.body
            let duplicatedEmail = await User.findOne({email: data.email})
            if(duplicatedEmail){
                return res.status(403).send({message:"Email already in use !!"})
            }

            let newUser = new User(data)
            newUser.save()
            res.status(201).send({
                message:"Account created !! \n",newUser
            })
        } catch(error){
            logger.error(error.message)
            res.status(500).send({
                message: error.message
            })
        }
    },


    login:async(req, res)=>{
        try{
            logger.info(req.body)
            // let data = req.body
            let {email, password} =req.body
            let user =await User.findOne({email})
            if(!user){
               return res.status(403).send({
                    message:"Invalid email or password"
                })
            }
    
            let validPassword = await bcrypt.compare(password , user.password)
            console.log(validPassword)
            if(!validPassword){
                return res.status(403).send({
                    message:"Invalid email or password"
                })
            }
            let secretKey =process.env.SECRET_KEY
            let token = await jwt.sign({id:user._id},secretKey)
            // console.log(token)
            // console.log(user)
    
            res.cookie("access_token",`Berear ${token} ` , {
                httpOnly:true ,
                maxAge: 1000 * 60 * 60 * 24 * 2
            })
            user.tokens.push(token)
            user.save()
            res.send()
        } catch (error){
            res.status(500).send({
                message : error.message
            })
        }
    }
}





module.exports = userController