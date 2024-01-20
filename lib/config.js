exports.member_type_enums = ["USER", "ADMIN", "BOOKSHOP", "DELIVER" ];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordernary_enums = ["Y", "N"]; 

exports.member_address_enums = ["Deagu", "Seoul", "Pusan", "Jeju", "Ulsan"];

exports.product_collection_enums = ["thriller", "history", "detective", "poetry", "atc"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["small", "large", "normal", "set"];


exports.order_status_enums = ["PAUSED", "PROCESS", "FINISHED", "DELETED"];

exports.like_view_group_list = ["product", "member", "community"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story"];
exports.board_article_status_enum_list = ["active", "deleted"];


/**********************************
 *    MONGODB RELATED COMMANDS    *
 *********************************/
 exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
}; //  Agar "target" turi "string" bo'lsa, uni "mongoose" paketining "ObjectID" konstruktori orqali
// yangi "mongoose" ObjectID obyektiga o'zgartiradi va uni qaytaradi.
//Aks holda, yani "target" turining "string" bo'lmagan holatda, "target" ni o'z holatida qaytaradi.
// Bu yerga "mongoose" ObjectID obyekti kiritilmaydi.
