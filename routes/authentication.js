const User = require('../models/user');
const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'kiranreddy1284@gmail.com',
    pass: '9010898679'
  }
}));

router.post('/register', (req, res) => {
    if(!req.body.email){
        res.json({success: false, message: 'email required'});
    }
    else{
        if(!req.body.username){
            res.json({success: false, message: 'password required'});
        }
        else{
            if(!req.body.password){
                res.json({success: false, message: 'password required'});
            }
            else{
                let user = new User({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username,
                    password: req.body.password
                });
                user.save((err) => {
                    if(err){
                        if(err.code === 11000){
                            res.json({success: false, message: 'username or email already exists'})                            
                        } 
                        else{
                            res.json({success: false, message: 'user not saved',err})
                        }
                    }
                    else{
                        var mailOptions = {
                            from: 'Kirans blog',
                            to: req.body.email,
                            subject: 'Sending Email using Node.js[nodemailer]',
                            text: 'That was easy!'
                          };
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });  
                          console.log('sda');
                        res.json({success: true, message: 'user saved kiran dha'});
                    }
                });
            }   
        }
    }
});

module.exports = router;