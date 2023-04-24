const express = require('express');
const app = express();
var ProtectedRoute = express.Router();
//var bodyParser = require("body-parser");

app.use(express.urlencoded({extended :true}));
app.use(express.json({extended : true, verify : (req, res, buf) => {
  req.rawBody = buf;
}}));

app.use('/api/v1',ProtectedRoute);
require('./database/connect');
var jwt = require('jsonwebtoken');
var auth = require('./controllers/auth.controller');

module.exports = {app ,ProtectedRoute, jwt, auth};

