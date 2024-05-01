const { log } = require("util")
const Blog = require("../models/blog.model")
const loggerEvent =require("../services/logger.service")
const logger = loggerEvent("blog")
const fs = require("fs")

const blogController ={
    craeteBlog : async (req,res)=>{
        try {
            console.log(req.body);
            // console.log(req.file)
            const date = new Date().toISOString()

            let newBlog = new Blog({...req.body,owner:req.user._id,date})
            if(req.file){

                newBlog.image = `/api/blog/${req.file.filename}`
            }

            await newBlog.save()
            res.send()
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    getBlog:async (req,res)=>{
        try {
            let blogs =await Blog.find({owner:req.user._id})
            res.send(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    updateBlog: async(req,res)=>{
        try {
            // console.log(req.file)
            if(req.file){
                let deletePath = req.file.path
                fs.unlinkSync(deletePath)
                var imagePath = `/api/blog/${req.file.filename}`
                // console.log(imagePath)

            }
            // console.log(req.body._id)
            let blog = await Blog.findByIdAndUpdate(req.body._id,{...req.body,image:imagePath},{new:true})
            
            res.send(blog)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    deleteBlog: async (req,res)=>{
        try {
            let {id} = req.params
            await Blog.findByIdAndDelete(id)
            res.send()
        } catch (error) {
                        logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
    getAllBlogs:async (req,res)=>{
        try {
            logger.info(req.user?.firstName)
            let blogs =await Blog.find({}).populate("owner")
            res.send(blogs)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send({
                message: error.message
        })
        }
    },
}

module.exports = blogController
