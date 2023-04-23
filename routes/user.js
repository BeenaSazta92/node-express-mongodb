module.exports =(appServer)=>{
    const userController = require('../controllers/users');
   
    appServer.post('/user-login', async (req, res) =>{
        let user = await userController.userLogin(req,res).then((res) => res);
        return user;
    });

    appServer.post('/user-signup' , async (req , res )=>{
        return await userController.userSignup(req,res).then((res)=>res);
    });

    appServer.get('/get-user/:username', async (req, res)=> {
        return await userController.getUser(req,res).then((res)=>res);
    });
}
