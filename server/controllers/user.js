const { response } = require("express");
const { ResultWithContext } = require("express-validator/src/chain");
const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
require("dotenv").config();


module.exports = {
    userSignup: (req, res) => {
        console.log("controller");
        console.log(req.body);
        userModel.doSignup(req.body).then((response) => {
            console.log(response);
            if (response === true) {
                res.status(201).send({ message: " User Signup Sucessfull" })
            }
        }).catch((err) => {
            console.log(err)
            res.status(403).send({ message: " User Signup error" })
        })



    },
    userLogin: (req, res) => {
        console.log("controller");
        console.log(req.body);
        userModel.doLogin(req.body).then((response) => {
            if (response.status) {
                req.session.loggedIn = true;
                req.session.user = response.user;
                const token = jwt.sign({_id:response.user},process.env.JWT_SECRET,{ expiresIn:"8h"})
                res.status(201).cookie("jwt",token,{expire : new Date()+9999,httpOnly:true}).send({ message: "User Login Sucessfull" , user: response.user},)



            } else {
                req.session.loginErr = true;
                console.log("user login err")
                res.status(401).send({ message: "User Login error" , })
            }

        })
    },

    userLogout:(req , res)=>{
        console.log(req.session);
    req.session.loggedIn = false;
    res.clearCookie("jwt").send({message:"User Logout Sucessful"})
    },
    getUser:(req,res)=>{
        console.log("controller");
        userModel.getUser().then((userData)=>{
            console.log(userData[0])
            res.send(userData)

        }).catch((err)=>{
            res.send("no data found")
        })
    },
    updateUser: (req, res) => {
        console.log(req.body);
        userModel.updateUser(req.body).then(() => {
            res.send({message:"User Updated"})
        }).catch((err)=>{
            res.send({message:"User Not Updated"})
        })
    },

    deleteUser:(req,res)=>{
    let userId = req.body;
    console.log(req.body);
    userModel.deleteUser(userId).then((response) => {
        res.send({message:"User Deleted"})
    });
        
    
},
addUserPost: (req, res) => {
    console.log("controller");
    console.log(req.body);
    userModel.addUserPost(req.body).then((response) => {
        console.log(response);
        if (response === true) {
            res.status(201).send({ message: " User Added Sucessfully" })
        }
    }).catch((err) => {
        console.log(err)
        res.status(403).send({ message: " User Creation error" })
    })



}
}

