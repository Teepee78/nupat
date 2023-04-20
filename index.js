import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import usersRouter from './src/routes/user.routes.js';

dotenv.config();

let app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/users', usersRouter);

// Connect to database
try {
  mongoose.connect(process.env.NUPAT_DATABASE_URI);
  console.log("Connected to database successfully!!!")
}
catch (error) {
  console.error(error);
}


// start server
app.listen(process.env.NUPAT_PORT || 3000, (error) => {
  if (!error) return console.log("Starting server on port 3000...");
  console.log(error);
});

export default app;
