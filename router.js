const express = require("express");
const router = express.Router();     
const memberController = require("./controllers/memberController");


/**********************************
 *         REST  API             *
 **********************************/

// memberController
router.post("/signup", memberController.signup);  
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


// Otherss routerlar
router.get("/Menu",  (req, res) =>{
    res.send ("book-menu page");
});


router.get("/Community",  (req, res) => {
    res.send ("community page");
});


// export router
module.exports = router;

