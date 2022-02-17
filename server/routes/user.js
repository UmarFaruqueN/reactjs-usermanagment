const express = require('express')
const router = express.Router();

const {userSignup, userLogin ,userLogout,getUser,updateUser,deleteUser,addUserPost} =require('../controllers/user')

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/userLogin",userLogin);
router.get("/userLogout",userLogout);
router.get("/getUser",getUser);
router.post("/updateUser",updateUser);
router.post("/deleteUser",deleteUser);
router.post("/addUserPost",addUserPost)



module.exports = router; 

