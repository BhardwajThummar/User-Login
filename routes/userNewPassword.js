//this is the script to update password
const router  = require('express').Router();
const { append } = require('express/lib/response');
const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
router.use(express.json());

router.put('/', async (req, res) => {
    const { email, newpassword } = req.body;
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
        //update password with newly hashed password
        bcrypt.genSalt(10, (err, salt) => { 
            bcrypt.hash(newpassword, salt, (err, hash) => {
                if (err) throw err;
                // Set password to hashed
                user.password = hash;
                user.save()
            });

        user.password = newpassword;
        // await user.save();
        res.send({ msg: "Password updated" });

        }); }
    });



module.exports = router;