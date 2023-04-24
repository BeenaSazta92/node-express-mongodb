const Users = require('../models/users.js');

exports.userLogin = async (req, res) => {
  console.log("inside user login", req.body)
    if(req.body.username != undefined  && req.body.password != undefined){
     
      var select ={
        username :1,
        email : 1,
        password :1
      };
    
      await Users.findOne({username: req.body.username}).select(select).then(async user =>{
        if(!user) {
          res.status(404).send({
            message: "User " +req.body.username+ " not found"
          });            
        }else{ 
          this.validatePassword(res,user,req.body.password);
        }
      }).catch(err => {
        res.status(500).send({
          message: "Error while retrieving user " + req.body.username
        });
      });
    }
}

exports.validatePassword = async(res,user,password) => {
  user.comparePassword('false',password,user,function (err, token) {
    if(token && !err) { 
      var result = {
      'response_code':200,
      'message':'Logged In Successfully',
      'user_details':{
        'email': user.email,
        'username' : user.username,
        'access_token' : token,
      }
    };
    res.send(result);         
    }else{
      return res.status(401).send({message: 'Authentication failed. Wrong password.'});
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

exports.getUserByName =  async (req, res) => { 
  var select ={
    username :1,
    email : 1,
  };
  Users.findOne({username:req.params.username}).select(select)
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

exports.deleteUserByUsername = async (req, res) => { 
  await Users.findOneAndRemove({username : req.params.username})
  .then(user => { 
    if(!user) {
      return res.status(404).send({
        message: "User doesn't exist"
      });
    }
    res.send({'response_code':200,message: "User " +req.params.username+ " deleted successfully!"});
  }).catch(err => {
    return res.status(500).send({
      message: "Could not delete user " + req.params.username});
  });
}

/******This method can be used for both patch and put******** */

exports.updateUser = async (req ,res)=>{
  console.log(req.params.username, req.body)
  if(req.params.username && req.body){
    const filter = { username: req.params.username };
    const update = req.body;
    await Users.findOneAndUpdate(filter,update,{new :true}).then(user =>{
      if(!user){
        return res.status(404).send({ message :" User " + req.params.username+ " not found"})
      }
      res.send({message : "updated successfully", data : user})
    }).catch(err =>{
      console.log("Error while updating user" , err);
      res.send({message : "Error while updating user"})
    });
  }
  else{
    res.status(500).send({ message :"No data given for update!"})
  }
}


