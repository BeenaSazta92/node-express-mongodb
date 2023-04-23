const express = require('express');
const app = express();
var ProtectedRoute = express.Router();
app.use('/api',ProtectedRoute);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
require('./database/connect');
var jwt = require('jsonwebtoken');
var auth = require('./controllers/auth.controller');

module.exports = {app ,ProtectedRoute, jwt, auth};


