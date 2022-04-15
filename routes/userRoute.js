const express = require('express');
const router = express.Router();
const userLoginRoute = require('./userLogin');
const userRegisterRoute = require('./userRegister');
const userForgotPasswordRoute = require('./userForgotPassword');
const userNewPasswordRoute = require('./userNewPassword');

router.get('/', async(req, res) => {
    res.send('this is user page');
})

router.use('/login', userLoginRoute);
router.use('/register', userRegisterRoute);
router.use('/forgot-password', userForgotPasswordRoute);
router.use('/new-password', userNewPasswordRoute);


module.exports = router;