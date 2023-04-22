require("dotenv").config();
var appServer = require('./app');
var port = process.env.PORT || 8080;

// create middleware

appServer.ProtectedRoute.use( (req, res, next)=>{
    res.send("Hello World!");
})

// listen port  
appServer.app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});

module.exports = appServer;