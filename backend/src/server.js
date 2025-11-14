// console.log('Heyyyyyy this is server.js');

// const express = require('express')

import express from 'express';
import path from 'path';
import {ENV} from './lib/env.js';

const app = express();


// console.log(ENV.PORT);
// console.log(ENV.DB_URL);

const __dirname = path.resolve()


app.get('/', (req, res) => {
    res.status(200).json({msg: 'api is working'});
});

app.get('/about', (req, res) => {
    res.status(200).json({msg: 'about api is working'});
});











// make our app ready for deployment

if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend /dist')))

    app.get('/{*any}',(req,res) => {
        res.sendFile(path.join(__dirname,'../frontend /dist/index.html'));
    });
    }









app.listen(ENV.PORT,() => {
    console.log('Server is running on port:',ENV.PORT);
});
