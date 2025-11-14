// console.log('Heyyyyyy this is server.js');

// const express = require('express')

import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({msg: 'succcccesss 123'});
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});
