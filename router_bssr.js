const express = require("express");
const router_bssr = express.Router();                   // expressni ichidan router olib chiqilyabdi
const bookshopController = require("./controllers/bookshopController.js");


/**********************************
 *         BSSR  EJS             *
 **********************************/



// traditionda front-end da view ishlamaydi o'rniga json formatda ma'lumot boradi
router_bssr
    .get("/signup", bookshopController.getSignupMyBookshop)  
    .post("/signup", bookshopController.signupProcess);  

router_bssr
    .get("/login", bookshopController.getLoginMyBookshop)
    .post("/login", bookshopController.loginProcess);

router_bssr.get("/logout", bookshopController.logout);



// export router
module.exports = router_bssr;