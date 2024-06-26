const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose, mongo} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();

//Database connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/productRoutes')); // Product routes
app.use('/', require('./routes/storeRoutes')); // store routes
app.use('/', require('./routes/recipeRoutes')); 


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
