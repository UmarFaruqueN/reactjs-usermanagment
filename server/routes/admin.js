const express = require('express')
const router = express.Router();

const {adminSignup,adminLogin,adminLogout} =require('../controllers/admin')

//middleware


//api routes
router.post("/adminSignup",adminSignup)
router.post("/adminLogin",adminLogin)
router.get("/adminLogout",adminLogout)

module.exports = router; 