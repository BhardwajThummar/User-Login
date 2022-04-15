const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.use(express.json());

router.get("/", async (req, res) => {
  res.send("this is registration page");
});
// router.post('/', async(req, res) => {
//     console.log(req.body);
// })
//Register Handle
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password) {
      errors.push({ msg: "Please fill in all fields" });
    return res.send({ msg: "field all details" });
  }
  //check pass length
  if (password.length < 6) {
    return res.send({ msg: "password length min 6" });
  }

  // Validation passed
  User.findOne({ email: email }).then((user) => {
    if (user) {
      // User exists
      return res.send({ msg: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // Set password to hashed
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.send({ msg: "Register" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
      newUser.save();
    }
  });
});

module.exports = router;
