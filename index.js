const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication');
var bodyParser = require('body-parser')
const cors = require('cors');
mongoose.Promise = global.Promise;
mongoose.connect(config.url,(err) => {
     if(err){
         console.log("Erro :",err); 
     }
     else{
         console.log('Database connceted');
     }
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/authentication',authentication);

app.use(express.static(__dirname + '/blog/dist/'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/blog/dist/index.html'));
});
app.listen( process.env.PORT || 3000,() => {
    console.log("local host 8000");
});