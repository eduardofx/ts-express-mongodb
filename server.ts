import 'dotenv/config'; 
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

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
// Middlewares
app.use(morgan('dev')); // log das requisições 
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors());

// Routes which should handle requests
router(app);

// Listen for requests in the given port
app.listen(PORT);
