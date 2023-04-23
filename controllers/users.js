const Users = require('../models/users.js');

exports.userLogin = async (req, res) => {
  console.log("inside user login")
    if(req.body.username != undefined  && req.body.password != undefined){
        var username = req.body.username;
        var password = req.body.password;

        var select ={
            username :1,
            email : 1,
            password : 1
        };
    
      await Users.findOne({username: username}).then(async user =>{
        if(!user) {
            res.status(404).send({
                message: "User "+req.body.username+" not found"
            });            
        }else{ 
          this.validatePassword(res,user,password);
      }
      }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                message: "User "+username+" not found"
            });                
        }
        res.status(500).send({
            message: "Error retrieving in user finding " + username
        });
      });
    }
    
}

exports.validatePassword = async(res,user,password,type) => {
   user.comparePassword('false',password,user,function (err, isMatch) {
      if(isMatch && !err) { 
        var result = {
          'response_code':200,
          'message':'Logged In Successfully',
          'user_details':{
            'email': user.email,
            'username' : user.username,
          }
        };
        res.send(result);         
        }else{
            return res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
        }
    });
}

exports.userSignup = async (req, res) => {
  var userexist = await Users.find({ username: req.body.username })
  .then(data => { 
      if(data.length>0) { 
          res.send({
              message: "Username already exist"
          }); 
          return true;                  
      }else{
          return false;
      }
  })
  if(userexist == true){
      return;
  }
  var emailexist = await Users.find({ email: req.body.email })
    .then(data => {
      if(data.length > 0) {
        res.send({
            message: "Email already exist"
        }); 
        return true;             
      }else{
        return false;
      }
  })
  if(emailexist == true){
      return;
  }
  if((userexist && emailexist) == false){
    const users = new Users({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await users.save().
      then(async data => {
        res.send({response_code:200,message:"Sign up successful.",data:data});
      }).catch(err => {
          console.log(err.message);
      res.status(500).send({
          message: err.message || "Some error occurred while creating the user."
      });
    });
  }
};

exports.getUser =  async (req, res) => { 
  Users.findOne({username:req.params.username})
  .then(data => {
    if(!data) {
      return res.status(404).send({
          message: "User " + req.params.username + "does not exist"
      });            
    }
    res.send({'response_code':200, data:data});
  }).catch(err => {
    console.log("error type ====", err.kind);
    if(err.kind === 'ObjectId' ) {
        return res.status(404).send({
          message: "User " + req.params.username + "does not exist"
        });                
    }
    return res.status(500).send({
        message: "Error while retrieving user "
    });
  });  
};

