const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise =global.Promise;
const userSchema = new Schema({
    email: {type: String, required: true,},
    username: {type: String, required: true,},
    password: {type: String, required: true},
    token:{type: String},
    verified: {type: Boolean}
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next();
    }
    else{
        bcrypt.hash(this.password,null,null, (err, hash) =>{
            if(err) return next(err);
            this.password = hash;
            next();
        });
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', userSchema);
