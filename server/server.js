//Entry point of the server
//process is the top level of the object

// const express  = require('express');
//with installing esm, we can use import and export easily insteal of use require... by starting the server, we need to type: ***nodemon -r esm server.js***
import  express  from 'express';
//fs is directly from node, not express;
import {readdirSync} from 'fs';
import cors from 'cors';
//require the dotenv library and invoke its config function
require('dotenv').config();
import morgan from 'morgan';
import mongoose from 'mongoose';


const port = process.env.PORT || 8001;
const DB = "pets_hotel_DB";
const app = express();



//middleware "morgan"
app.use(morgan('dev'));

//middleware "cors"
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended:true}));



require('./configs/mongooseConfig')(DB);
// const mongooseConnectionFunc = require('./config/mongoose.config');
// mongooseConnectionFunc(DB)


//route middleware "use method":
//prefix: /api
// app.use('/api', router);
//"readirSync" can read the entire files in one directory
readdirSync("./routes").map((route) => app.use("/api", require(`./routes/${route}`)));

app.listen(port, () => console.log(`Runnging on port ${port}`));