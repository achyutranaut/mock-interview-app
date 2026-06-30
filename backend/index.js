require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

connectDB();

app.use(cors({
  origin: 'https://mock-interview-app-swart.vercel.app',
  credentials: true
}));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));

app.use('/api/interview', verifyJWT, require('./routes/interview'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log(`Server running on ${PORT}`)
  );
})

