console.log("Starting Web Server");
// const http=require("http");
const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cookieParser = require("cookie-parser");
const cors = require('cors'); 


let session = require("express-session"); // call express sessionni
const MongoDBStore = require("connect-mongodb-session")(session); 
const store = new MongoDBStore({
  uri: process.env.MONGO_URL, 
  collection: "sessions", 
});

// 1: Entery codes
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: true,    
})
);
app.use(cookieParser());

// 2: Session codes
app.use(
    session({
        secret: process.env.SESSION_SECRET,  
        cookie: {
            maxAge: 1000 * 60 * 30,           
        },
        store: store,                    
        resave: true,
        saveUninitialized: true,
    })
);


app.use(function (req, res, next) {
    res.locals.member = req.session.member;
    next();
})

// 3: Views codes
app.set("views", "views");
app.set("view engine", "ejs");

// 4: Routing codes
app.use("/resto", router_bssr); // for ADMIN and BOOkSHOP users.
app.use("/", router);           // for Costumers.

module.exports = app;
