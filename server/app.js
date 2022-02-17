const express = require('express');
var cors = require('cors')

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var db = require('./config/connections')
require("dotenv").config();
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")


//app
const app = express();



//middleware
app.use(cors())

app.use(function (req, res, next) {
  res.set("cache-control", "no-cache,no-store,must-revalidate");
  next();
});
app.use(session({ secret: "Key", cookie: { maxAge: 600000 } }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes 
app.use("/",userRoutes)
app.use("/admin", adminRoutes)




//db 

db.connect((err)=>{
  if(err)
  console.log("db err"+err);
  else
  console.log("db connected");
});

//port

const port =process.env.PORT || 4000;
 
const server = app.listen(port,()=>{
  console.log(`server is running on PORT ${port}`);
})



