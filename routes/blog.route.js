const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blog.control")
const blogUpload = require("../middelware/blog.middleware")
const auth = require("../middelware/auth.middleware")



router.route("/")
    // .post(blogUpload.single("image"),blogController.craeteBlog)
    .post(auth.authentication,blogUpload.single("image"),blogController.craeteBlog)
    .get(auth.authentication,blogController.getBlog)
    .patch(auth.authentication,blogUpload.single("image"),blogController.updateBlog)

router.delete("/:id",auth.authentication,blogController.deleteBlog)

router.get("/allblogs",auth.adminAuthorization,blogController.getAllBlogs)

module.exports = router