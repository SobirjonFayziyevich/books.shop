const MemberModel = require("../schema/member.model");
const assert = require("assert");
const Definer = require("../lib/error");
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_liked,
} = require("../lib/config");
const Member = require("./Member");
const { lookup } = require("dns");



class Bookshop {
  constructor() {
    this.memberModel = MemberModel;
  }
  async getBookshopData(member, data) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      const match = { mb_type: "BOOKSHOP", mb_status: "ACTIVE" };

      let aggregationQuery = [];
      data.limit = data["limit"] * 1;
      data.page = data["page"] * 1;

      switch (data.order) {
        case "top":
          match["mb_top"] = "Y";
          aggregationQuery.push({ $match: match });
          aggregationQuery.push({ $sample: { size: data.limit } });

          break;
        case "random":
          aggregationQuery.push({ $match: match });
          aggregationQuery.push({ $sample: { size: data.limit } });
          break;
        default:
          aggregationQuery.push({ $match: match });
          const sort = { [data.order]: -1 };
          // eng oxirgi qushilgan book.
          aggregationQuery.push({ $sort: sort });
          break;
      }
      aggregationQuery.push({ $skip: (data.page - 1) * data.limit });
      aggregationQuery.push({ $limit: data.limit });
      //TODO: check auth member  likes the chosen target. (harbir restarantga like bosganmizmi yuqmi?) metodini yasaymn.
      aggregationQuery.push(lookup_auth_member_liked(auth_mb_id));
      const result = await this.memberModel.aggregate(aggregationQuery).exec();
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenBookshopData(member, id) {
    try {
      id = shapeIntoMongooseObjectId(id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "member");
      }

      const result = await this.memberModel
        .findOne({
          _id: id,
          mb_status: "ACTIVE",
        })
        .exec();
      assert.ok(result, Definer.general_err2);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllBookshopData() {
    try {
      let result = await this.memberModel
        .find({
          mb_type: "BOOKSHOP",
        })
        .exec();
      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateBookshopByAdminData(update_data) {
    try {
      const id = shapeIntoMongooseObjectId(update_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Bookshop;
