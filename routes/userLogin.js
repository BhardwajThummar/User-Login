const express = require('express');
const router = express.Router();
router.use(express.json());
const bcrypt =  require('bcrypt');
const User = require('../models/User');

router.get('/', async(req, res) => {
    res.send('this is login page');
})

//User login 
router.post('/', async(req, res) => {
    const { email, password } = req.body;

    //validation 
    if (!email || !password) {
        return res.send({ msg: "please fill in all fields" });
    }
    //check if user exist
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.send({ msg: "user not found" });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send({ msg: "password incorrect" });
    }

    //login success
    // req.session.user = user;
    res.send({ msg: "login success" }); 

})


module.exports = router;