import express, { request, response } from "express";
import { PORT, mongoDB } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handeling CORS

//option 1
app.use(cors());

//option 2 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowHeaders: ['Content-Type'],
// })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDB)
    .then(() => {
        console.log('app connected to database');
        app.listen(PORT, () => {
            console.log(`App is running on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })