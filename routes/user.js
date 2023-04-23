
module.exports =(ProtectedRoute, appServer)=>{
    const userController = require('../controllers/users.controller');
   
    appServer.post('/user-login', async (req, res) =>{
        return await userController.userLogin(req,res).then((res) => res);
    });

    appServer.post('/user-signup' , async (req , res )=>{
        return await userController.userSignup(req,res).then((res)=>res);
    });

    ProtectedRoute.get('/get-user/:username', async (req, res)=> {
        return await userController.getUser(req,res).then((res)=>res);
    });
}
