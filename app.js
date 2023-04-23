const express = require('express');
const app = express();
var ProtectedRoute = express.Router();
app.use('',ProtectedRoute);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
require('./database/connect');

module.exports = {app ,ProtectedRoute};


