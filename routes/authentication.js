const User = require('../models/user');
const express = require('express');
const router = express.Router();

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
                        res.json({success: true, message: 'user saved'});
                    }
                });
            }   
        }
    }
});

module.exports = router;