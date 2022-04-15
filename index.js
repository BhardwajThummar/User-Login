const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI , () => {
    console.log('Connected to MongoDB');
});

//Routes
app.get('/', (req, res) => {
    res.send(' WELCOME TO HOME PAGE');
})

app.use('/user', userRoute);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});