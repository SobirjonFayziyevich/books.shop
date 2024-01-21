const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const { getChosenMember } = require("./controllers/memberController");
const { getAllProducts } = require("./controllers/productController");
const communityController = require("./controllers/communityController");
const bookshopController = require("./controllers/bookshopController");
const uploader_community = require("./utils/upload-multer")("community"); //community adressi.
const uploader_member = require("./utils/upload-multer")("members"); //members adressi.
// member argumenti asosida uploader objectini yasab beradi,

/**********************************
 *         REST  API             *
 **********************************/

// memberController
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

router.get("/menu", (req, res) => {
  res.send("Menu Page");
});
router.get("/community", (req, res) => {
  res.send("Community Page");
});

module.exports = router;
