const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const followController = require("./controllers/followController");
const productController = require("./controllers/productController");
const { getChosenMember } = require("./controllers/memberController");
const { getAllProducts } = require("./controllers/productController");
const communityController = require("./controllers/communityController");
const orderController = require("./controllers/orderController");
const bookshopController = require("./controllers/bookshopController");
const uploader_community = require("./utils/upload-multer")("community"); //community adressi.
const uploader_members = require("./utils/upload-multer")("members"); //members adressi.
// member argumenti asosida uploader objectini yasab beradi,

/**********************************
 *         REST  API             *
 **********************************/

// memberController
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

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
  uploader_members.single("mb_image"),
  memberController.updateMember
);

// PRODUCT RELATED ROUTERS
router.post(
  "/products",
  memberController.retrieveAuthMember, // bizni kimligimizni aniqlaydi. va likelarni kim bosganini ham bildiradi.
  productController.getAllProducts
); //barcha restar mahsulotlarini bitta qilib qyozish.
router.post(
  "/products",
  memberController.retrieveAuthMember, //
  productController.getAllProducts
);
router.get(
  "/products/:id",
  memberController.retrieveAuthMember, //auth user chosen productga like bosganmi yuqmi.
  productController.getChosenProduct
);

// BOOKSHOP RELATED ROUTERS
router.get(
  "/books",
  memberController.retrieveAuthMember,
  bookshopController.getBookshop
);

router.get(
  "/books/:id",
  memberController.retrieveAuthMember,
  bookshopController.getChosenBookshop
);

          // ORDER RELATED ROUTERS: (faqat orderlarga dahldor);
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);

router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);

router.post(
  "/orders/edit",
  memberController.retrieveAuthMember,
  orderController.editChosenOrder
);

             // COMMUNITY RELATED ROUTERS START:
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

//  Following related router;
router.post(
  "/follow/subscribe",
  memberController.retrieveAuthMember,
  followController.subscribe
);

router.post(
  "/follow/unsubscribe",
  memberController.retrieveAuthMember,
  followController.unsubscribe
);

router.get("/follow/followings", followController.getMemberFollowings);

router.get(
  "/follow/followers",
  memberController.retrieveAuthMember,
  followController.getMemberFollowers
);

module.exports = router;
