'use strict';
// eslint-disable-next-line import/no-unresolved
const express = require('express');
const connection=require('./DBconnect');
const cors=require('cors');
const bodyParser=require('body-parser');
const indexRouter=require('./routes/index');
const whitelist = ['http://localhost:3000', 'http://axer.s3-website.us-east-2.amazonaws.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}



const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/',indexRouter)


app.use((err, req, res) => {
  res.status(500);
  res.send('Internal Serverless Error');
});

module.exports = app;
