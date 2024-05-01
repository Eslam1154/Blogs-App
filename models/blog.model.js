const mongoose= require("mongoose")
const Schema= mongoose.Schema


const blogSchema= new Schema({
    title:{
        type: String,
        trim : true,
        required : true
    },
    content :{
        type: String,
        trim : true,
        required : true
    },
    image : {
        type: String,
        trim : true,
    },
    date : {
        type: String,
        trim : true,
        required : true
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required:true
    }
})


const Blog = mongoose.model("blog",blogSchema)
module.exports=Blog
