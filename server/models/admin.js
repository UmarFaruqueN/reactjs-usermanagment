var db = require("../config/connections");


module.exports = {
    doSignup: (userData) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection("admins")
                .insertOne(userData)
                .then((data) => {
                    resolve(data.acknowledged);
                }).catch((err) => {
                    reject(err)
                    console.log("signup failed");
                    console.log(error);
                });
        });
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db.get().collection("admins").findOne({ user_email: userData.user_email });
            if (user) {

                if (userData.user_password === user.user_password) {
                    console.log("login sucesss");
                    response.user = user;
                    response.status = true;
                    resolve(response);
                } else {
                    console.log("login failed  admin password donot match");
                    resolve({ status: false });
                }



            } else {
                console.log("login failed");
                resolve({ status: false });
            }
        });
    }
}