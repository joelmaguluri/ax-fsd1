const mongoose = require('mongoose');

const uri= "mongodb+srv://joel_maguluri:22yjag3o1bHsMxXK@blockchain.bhvkd.mongodb.net/axer?retryWrites=true&w=majority";

const connection=mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports=connection;