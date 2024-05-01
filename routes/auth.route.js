const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.control')
const {newUserValidation, LoginValidation} =require('../middelware/userValidation.middleware');
const { newUserSchema, loginSchema } = require('../services/userValidation.service');

router.post("/login",LoginValidation, authController.login)
router.post("/signup",newUserValidation, authController.newUser)
module.exports = router

