'use strict';
// eslint-disable-next-line import/no-unresolved
const express = require('express');
const connection=require('./DBconnect');
const cors=require('cors');
const bodyParser=require('body-parser');
const indexRouter=require('./routes/index');


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/',indexRouter)


app.use((err, req, res) => {
  res.status(500);
  res.send('Internal Serverless Error');
});


module.exports = app;
