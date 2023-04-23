const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    var token;
    if(req.headers['api_access_token'] || req.headers.api_access_token){
        token = req.headers['api_access_token'] || req.headers.api_access_token;
    }
   
    if (!token) {
        return res.status(401).send("A token is required for authentication");
    }
    try {
        jwt.verify(token, process.env.SECRET);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
   return next();
};

