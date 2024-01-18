const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const { getChosenMember } = require("./controllers/memberController");
const { getAllProducts } = require("./controllers/productController");
// const orderController = require("./controllers/orderController");
const communityController = require("./controllers/communityController");
// const followController = require("./controllers/followController");
const bookshopController = require("./controllers/bookshopController");
const uploader_community = require("./utils/upload-multer")("community"); //community adressi.
// community argumenti asosida uploader objectini yasab beradi,
const uploader_member = require("./utils/upload-multer")("members"); //members adressi.
// member argumenti asosida uploader objectini yasab beradi,

/**********************************
 *         REST  API             *
 **********************************/

// memberController
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

// Otherss routerlar
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

router.post(
  "/member-liken",
  memberController.retrieveAuthMember,
  memberController.likeMemberChosen
);

router.post(
  "/member/update",
  memberController.retrieveAuthMember,
  uploader_member.single("mb_image"),
  memberController.updateMember
);

// BOOKSHOP RELATED ROUTERS
router.get(
  "/book",
  memberController.retrieveAuthMember,
  bookshopController.getBookshop
);

router.get(
  "/book/:id",
  memberController.retrieveAuthMember,
  bookshopController.getChosenBookshop
);

router.post(
    "/community/image",
    uploader_community.single("community_image"), //single mathod orqali imageni community_image nomi bn backendga yubordim.
    communityController.imageInsertion
  ); //keyingi mantiqim communityControllerni hosil qilib unga,maxsus imageInsertion degan mathodni yozib oldim.
  
  router.post(
    "/community/create",
    memberController.retrieveAuthMember,
    communityController.createArticle
  );
  
  router.get(
    "/community/articles",
    memberController.retrieveAuthMember,
    communityController.getMemberArticles
  );
  
  router.get(
    "/community/target",
    memberController.retrieveAuthMember, // buyerda harqanday atriclega like bosganmizmi, yuqmi shuni topish un uzimizni retrive qilishimz kerak.
    communityController.getArticles
  );
  
  router.get(
    "/community/single-article/:art_id",
    memberController.retrieveAuthMember, // buyerda harqanday atriclega like bosganmizmi, yuqmi shuni topish un uzimizni retrive qilishimz kerak.
    communityController.getChosenArticle
  );
  

// export router
module.exports = router;
