
const express= require ('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const cors = require('cors'); // Import the cors middleware
const dotenv = require("dotenv");
const middlewaire=require('./middlewair/error');
dotenv.config({ path: "Backend/config/config.env" }); 

 

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())


const product = require('./routes/ProudectRoute');
const User = require('./routes/userRoutes');
const Order=require('./routes/orderRoutes')
const Payment=require('./routes/PaymentRoutes')
app.use('/api/v1', product);
app.use('/api/v1',User)
app.use('/api/v1',Order)
app.use('/api/v1',Payment)


app.use(middlewaire);

module.exports = app;