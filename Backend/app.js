const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const middlewaire=require('./middlewair/error')
const app = express();

app.use(express.json());
app.use(cookieParser());
const product = require('./routes/ProudectRoute');
const User = require('./routes/userRoutes');
const Order=require('./routes/orderRoutes')
app.use('/api/v1', product);
app.use('/api/v1',User)
app.use('/api/v1',Order)

app.use(middlewaire)

module.exports = app;
