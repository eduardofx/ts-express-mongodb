import 'dotenv/config'; 
import cors from 'cors';
import express, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './api/routes/index';

const { PORT, DB_URL } = process.env;

// Create the express instance
const app = express();

mongoose.connect(DB_URL || '');

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Middlewares
app.use(morgan('dev') as RequestHandler); // log das requisições 
app.use(express.json() as RequestHandler); //Used to parse JSON bodies 

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: false }) as RequestHandler);

app.use(cors());

// Routes which should handle requests
router(app);

// Listen for requests in the given port
app.listen(PORT);
