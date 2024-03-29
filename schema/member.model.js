const mongoose = require("mongoose");
const {
    member_address_enums,
    member_status_enums,
    member_type_enums, 
    ordernary_enums} = require("../lib/config");

const memberSchema = new mongoose.Schema({
    // mongoose ni ichidan schema olinyabdi
    // schema validation ham hisoblanadi
    // (EAR modulingdagi)  member buyich malumotlarni joylashtirib chiqamiz.
    mb_nick: {
        type: String,
        required: true,
        index: {unique: true, sparse: true} // kimdir ishlatgan nickni qayta ishlatsa xatoli deb chiqarishi un
    },
    mb_phone: {
        type: String,
        required: true,
        index: {unique: true, sparse: true}   
        
    },
    mb_password: {
        type: String,
        required: true,
        select: false  // password ko'rinmasligi uchun
    },
    mb_type: {
        type: String,
        required: false,
        default: "BOOKSHOP",
        enum: {
            values: member_type_enums,
            message: "{VALUE} is not among permitted values " // valueni ichida bulmagan tashqaridan malumot kelsa xatolik bulsin.
        }
    },
    mb_status: {
        type: String,
        required: false,
        default: "ACTIVE",
        enum: {
            values: member_status_enums,
            message: "{VALUE} is not among permitted values "
        }
    },
    mb_full_name: {
        type: String,
        required: false
    },

    mb_address: {
        type: String,
        required: false,
        default: "Pusan",
        enum: {
            values: member_address_enums,
            message: "{VALUE} is not among permitted values "
        }
    },
    mb_description: {
        type: String, required: false
    },
    mb_image: {
        type: String,
        required: false
    },
    mb_point: {
        type: Number,
        required: false,
        default: 0
    },
    mb_top: {
        type: String,
        required: false,
        default: "N",
        enum: {
            values: ordernary_enums,
            message: "{VALUE} is not among permitted values "
        }
    },
    mb_views: {
        type: Number,
        required: false,
        default: 0
    },
    mb_likes: {
        type: Number,
        required: false,
        default: 0
    },
    mb_follow_cnt: {
        type: Number,
        required: false,
        default: 0
    },
    mb_subscriber_cnt: {
        type: Number,
        required: false,
        default: 0
    },
    // {timestamps: true}  updatedAt, createdAt

}, {timestamps: true});

module.exports = mongoose.model("Member", memberSchema);
