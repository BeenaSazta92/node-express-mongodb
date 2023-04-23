const express = require('express');
const app = express();
var ProtectedRoute = express.Router();
app.use('',ProtectedRoute);
module.exports = {app ,ProtectedRoute};
require('./database/connect');


