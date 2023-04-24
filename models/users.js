const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
require("dotenv").config();
var jwt = require('jsonwebtoken');

const UsersSchema = mongoose.Schema({
    //_id: false ,// if you da not want _id in your collection
    username :{ "type": String, "required": true,"unique": true},
    email: { type: String },
    password : { type : String, reuired : true},
    email : String,
},{
    timestamps: true
});

UsersSchema.index({username: -1 });

UsersSchema.pre('save', function (next) { 
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(user.password, 10, function(error, hash) {
            if (error) {
              return next(error);
            } else {
              user.password = hash;
              next();
            }
          });
    } else {
        return next();
    }
});

UsersSchema.methods.comparePassword = function (updateuser, passw,user,callback) {
    bcrypt.compare(passw, user.password, async function (err, isMatch) {
        if (err) {
            return callback(err);
        }else{   
            if(updateuser == 'false'){
                if(isMatch == true){
                    console.log("id ============",user._id.toString())
                    var token = await generateToken(user._id.toString());
                    callback(null, token);              
                }else{
                    callback(null, isMatch); 
                }
            }else{
                callback(null, isMatch); 
            }                     
        }        
    });
};

function generateToken(id){
    return jwt.sign( { userId: id }, process.env.SECRET, { expiresIn: "2h" });
}

module.exports = mongoose.model('Users', UsersSchema);
