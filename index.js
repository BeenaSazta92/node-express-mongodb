require("dotenv").config();
var appServer = require('./app');
var port = process.env.PORT || 8080;

appServer.ProtectedRoute.use(appServer.auth);
require('./routes/routes')(appServer.ProtectedRoute,appServer.app);

// listen port  
appServer.app.use((req,res,next)=>{

  var err = new Error('getting error');
  err.status = 404;
  next(err);
})
appServer.app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});

module.exports = appServer;