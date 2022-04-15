//this is the script to handle the forgot password request
const router  = require('express').Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const express = require('express');
const otpGenerator = require('otp-generator');
const mongoose = require('mongoose');
const Otp = require('../models/Otp');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('this is forgot password page');
})

//SEND otp to user email
router.post('/', async (req, res) => {
    const { email } = req.body;
    let errors = [];
    //check if email is valid
    if (!email) {
        errors.push({ msg: "Please enter your email" });
    }
    //check if email is registered
    const user = await User.findOne({ email: email });
    if (!user) {
        errors.push({ msg: "Email is not registered" });
    }
    //if there is no error
    if (errors.length > 0) {
        res.send({ errors });
    }
    else {
        //generate otp
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        
        //delete previous otp
        await Otp.deleteMany({ email: email });

        //send otp to user email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bslilbeats@gmail.com',
                pass: 'betcgppyycsgmekg'
            }
        });
        const mailOptions = {
            from: 'bslilbeats@gmail.com',
            to: email,
            subject: 'OTP for password reset',
            text: `Your OTP is ${otp}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //save otp to database
        const otpData = new Otp({
            email: email,
            otp: otp
        });
        otpData.save();
      
        res.send({ msg: "OTP sent to your email" });
    }
});

//verify otp
router.post('/verify', async (req, res) => {
    const { email, otp } = req.body;
    console.log("USER's OTP = ",req.body.otp)

    //check if all fields are filled
    if (!email || !otp) {
        return res.send({ msg: "Please fill in all fields" });
    }
    let errors = [];
    //check if email is valid
    if (!email) {
        errors.push({ msg: "Please enter your email" });
    }
    //check if email is registered
    const user = await User.findOne({ email: email });
    if (!user) {
        errors.push({ msg: "Email is not registered" });
    }

    //GET OTP object from database
    const otpData = await Otp.findOne({ });
    
    // console.log("otpData",otpData)
    // console.log("otpData.otp = ",otpData.otp)
    // console.log('otpDate = ',otpData.date)
    // console.log('otpEmail = ',otpData.email)
  
   //check if otp is valid
    if (otpData.otp !== otp) {
        errors.push({ msg: "OTP is not valid" });
    }
    //check if otp is expired
    if (otpData.date < Date.now() - 300000) {
        errors.push({ msg: "OTP is expired" });
    }
    //if there is no error
    if (errors.length > 0) {
        res.send({ errors });
    }
    else {
        //delete otp from database
        // Otp.deleteOne({ email: email });
        res.send({ msg: "OTP is verified" });
    }

});

module.exports = router;