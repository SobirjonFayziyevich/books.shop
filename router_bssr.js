const express = require("express");
const router_bssr = express.Router(); // expressni ichidan router olib chiqilyabdi
const bookshopController = require("./controllers/bookshopController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_members = require("./utils/upload-multer")("members");
// const { uploadProductImage } = require("./utils/upload-multer");
/**********************************
 *         BSSR  EJS             *
 **********************************/
// traditionda front-end da view ishlamaydi o'rniga json formatda ma'lumot boradi
// memberga dahldor routerlar.

router_bssr.get("/", bookshopController.home);
 
  router_bssr
  .get("/sign-up", bookshopController.getSignupMyBookshop)
  .post(
    "/sign-up",
    uploader_members.single("book_img"),
  bookshopController.signupProcess
  );     

router_bssr
  .get("/login", bookshopController.getLoginMyBookshop)
  .post("/login", bookshopController.loginProcess);

router_bssr.get("/logout", bookshopController.logout);
router_bssr.get("/check-me", bookshopController.checkSession);

router_bssr.get("/products/menu", bookshopController.getMybookshopProducts);

router_bssr.post(
  "/products/create",
  bookshopController.validateAuthbookshop,
  // uploadProductImage.array("product_images", 5),
  uploader_product.array("product_images", 5),
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
