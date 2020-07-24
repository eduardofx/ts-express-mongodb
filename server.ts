import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './api/routes/index';

const { PORT, DB_URL } = process.env;

// Create the express instance
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(DB_URL || '', { useNewUrlParser: true });

// Middlewares
app.use(morgan('dev')); // log das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes which should handle requests
router(app);

// Listen for requests in the given port
app.listen(PORT);
