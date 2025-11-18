import express from 'express';
import path from 'path';
import {ENV} from './lib/env.js';
import { connectDB } from "./lib/db.js";
import cors from 'cors';
// import { serve } from './lib/inngest.js';
import {serve} from 'inngest/express';
import {inngest , functions} from './lib/inngest.js';

const app = express();


const __dirname = path.resolve();


//middleware

app.use(express.json())
// ISME SERVER KO BATA RHE KI KAISE HANDLE KARNA HAI REQUESTS KO
app.use(cors({ origin : ENV.CLIENT_URL,credentials: true
}));


app.use('/api/inngest', serve ({client : inngest , functions})); 

app.get('/', (req, res) => {
    res.status(200).json({msg: 'api is working'});
});

app.get('/about', (req, res) => {
    res.status(200).json({msg: 'about api is working'});
});


// make our app ready for deployment

if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')));

    app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});
    }

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT,() => {
    console.log('Server is running on port:',ENV.PORT);
});
    }
    catch (error) {
        console.error('Error starting server🤦‍♂️:', error);
    }}      
    startServer();