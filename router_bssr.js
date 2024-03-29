const express = require("express");
const router_bssr = express.Router(); // expressni ichidan router olib chiqilyabdi
const bookshopController = require("./controllers/bookshopController");
const productController = require("./controllers/productController");
 const uploader = require("./utils/upload-multer");



/**********************************
 *         BSSR  EJS             *
 **********************************/
// traditionda front-end da view ishlamaydi o'rniga json formatda ma'lumot boradi
// memberga dahldor routerlar.
router_bssr.get("/", bookshopController.home);
 
  router_bssr.get("/signup", bookshopController.getSignupMyBookshop);
  router_bssr.post(
    "/signup",
    uploader("members").single("shop_image"),
  bookshopController.signupProcess
  );     

router_bssr
  .get("/login", bookshopController.getLoginMyBookshop)
  .post("/login", bookshopController.loginProcess);

router_bssr.get("/logout", bookshopController.logout);
router_bssr.get("/check-me", bookshopController.checkSessions);

router_bssr.get("/products/menu", bookshopController.getMybookshopData);
router_bssr.post(
  "/products/create",
  bookshopController.validateAuthbookshop,
  uploader("products").array("book_images", 5),
  productController.addNewProduct
);
router_bssr.post(
  "/products/edit/:id",
  bookshopController.validateAuthbookshop,
  productController.updateChosenProduct
);
router_bssr.get(
  "/all-book",
  bookshopController.validateAdmin,
  bookshopController.getAllBookshop
);

router_bssr.post(
  "/all-book/edit",
  bookshopController.validateAdmin,
  bookshopController.updateBookshopByAdmin
);


// export router
module.exports = router_bssr;
