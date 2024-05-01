const express = require("express")
const router = express.Router()
const userCtl = require("../controllers/user.controller")
const auth = require("../middelware/auth.middleware")



router.route("/:id")
    .delete(auth.adminAuthorization,userCtl.deleteUser)


// router.route("/")
//     .get(auth.authentication,userCtl.getUser)
//     .patch(auth.authentication,userCtl.updateUser)
router.use(auth.authentication)

router.route("/")
    .get(userCtl.getUser)
    .patch(userCtl.updateUser)
    
router.post("/update/password", userCtl.updatePassword)




module.exports = router