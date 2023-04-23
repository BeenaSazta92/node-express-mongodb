require("dotenv").config();
var appServer = require('./app');
var port = process.env.PORT || 8080;

// create middleware

appServer.ProtectedRoute.use(function(req, res, next) {
  next();
});

require('./routes/routes')(appServer.ProtectedRoute,appServer.app);

// listen port  
appServer.app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});

module.exports = appServer;