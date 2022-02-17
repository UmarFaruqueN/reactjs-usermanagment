const adminModel = require("../models/admin")

module.exports = {
    adminSignup: (req, res) => {
        console.log("controller");
        console.log(req.body);
        adminModel.doSignup(req.body).then((response) => {
            console.log(response);
            if (response === true) {
                res.status(201).send({ message: " Admin Signup Sucessfull" })
            }
        }).catch((err) => {
            console.log(err)
            res.status(403).send({ message: " Admin Signup failed" })
        })


    },

    adminLogin: (req, res) => {
        console.log("controller");
        console.log(req.body);
        adminModel.doLogin(req.body).then((response) => {
            if (response.status) {
                req.session.loggedIn = true;
                req.session.user = response.user;
                res.status(201).send({ message: "Admin Login Sucessfull" })
            } else {
                req.session.loginErr = true;
                console.log("user login err")
                res.status(403).send({ message: "Admin Login error" })
            }
        })
    },

    adminLogout:(req , res)=>{
        console.log(req.session);
    req.session.loggedIn = false;
    res.send({message:"Admin Logout Sucessful"})
    }
}

