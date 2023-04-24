
module.exports =(ProtectedRoute, appServer)=>{
    const userController = require('../controllers/users.controller');

    // users REST api endpoints 
   
    appServer.post('/user-login', async (req, res) =>{
        return await userController.userLogin(req,res).then((res) => res);
    });

    appServer.post('/user-signup' , async (req , res )=>{
        return await userController.userSignup(req,res).then((res)=>res);
    });

    /* protected routes ===> 
        1. access using protected route path (host/api/)
        2. need to pass jwt access token 
    */

    ProtectedRoute.get('/get-user/:username', async (req, res)=> {
        return await userController.getUserByUsername(req,res).then((res)=>res);
    });

    ProtectedRoute.delete('/delete-user', async (req, res)=> {
        return await userController.deleteUserByUsername(req,res).then((res)=>res);
    });

    /*
    Update user 
        1. in case of updating indivisual fields without overwriting always use PATCH method
        2. Put will overwite missing fileds values to empty/null 

    */
    ProtectedRoute.patch('/update-user/:username', async (req, res)=> {
        return await userController.updateUser(req,res).then((res)=>res);
    });

    ProtectedRoute.put('/update-user/:username', async (req, res)=> {
        return await userController.updateUser(req,res).then((res)=>res);
    });
}
