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

app.use(express.static(__dirname + 'client/dist/'));
app.use('/authentication',authentication);

app.get('*',(req,res) => {
    res.sendfile(path.join(__dirname + 'client/dist/index.html'));
});

app.listen( process.env.PORT || 3000,() => {
    console.log("local host 8000");
});