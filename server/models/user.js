var db = require("../config/connections");
var objectId= require('mongodb').ObjectId


module.exports={
    doSignup: (userData) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection("users")
                .insertOne(userData)
                .then((data) => {
                    resolve(data.acknowledged);
                }).catch((err)=>{
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
            let user = await db.get().collection("users").findOne( { user_email: userData.user_email});
            if (user) {
                
                    if (userData.user_password ===user.user_password) {
                        console.log("login sucesss");
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log("login failed password donot match");
                        resolve({ status: false });
                    }
                    
                
               
            } else {
                console.log("login failed");
                resolve({ status: false });
            }
        });
    },
    getUser: () => {
        return new Promise(async (resolve, reject) => {
            let userData = await db.get().collection("users").find().toArray();
            resolve(userData);
        });
    },
    updateUser:(userData)=>{
        return new Promise((resolve,reject)=>{
            console.log("model");
            console.log(userData);
             db.get().collection('users').updateOne({_id:objectId(userData.id)},{
                $set:{ name:userData.name,
                    phone:userData.phone,
                    email:userData.email,
                    password:userData.password,
    
                }
            
            }
            ).then((response)=>{
                console.log(response);
            resolve(response)

            }).catch((err)=>{
                reject(err)
            })
        })
    },
    deleteUser:(userId)=>{
    return new Promise( (resolve , reject)=>{
        db.get().collection('users').deleteOne({_id:objectId(userId._id)}).then((response)=>{
            resolve(response)
            console.log('deleted');
        })
    })
},
addUserPost: (userData) => {
    return new Promise((resolve, reject) => {
        db.get()
            .collection("users")
            .insertOne(userData)
            .then((data) => {
                resolve(data.acknowledged);
            }).catch((err)=>{
                reject(err)
                console.log("add user failed");
                console.log(error);
            });
    });
}
}