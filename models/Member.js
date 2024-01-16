const MemberModel = require("../schema/member.model");
const Definer = require("../lib/error");
const assert = require("assert");
const bcrypt = require("bcrypt");

class Member {
  constructor() {
    this.memberModel = MemberModel; // service model ichida schema model =dan foydalinyabdi
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);
     // schema modeldan  class sifatida foydalanib uni ichida datani berib, yangi object hosil qilib
      //mongodb boshqacha formatdagi error beradi

      let result;
      try {
        result = await new_member.save(); 
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1); 
      }
      result.mb_password = ""; 
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel // member schema model
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 }) // 0 va 1 buyog'da majburlab chaqiryabdi forced chaqirish..
        .exec();

      assert.ok(member, Definer.auth_err2); 

      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password // bu yerda passwordni csolishtirib natijasini eytadi
      );
      assert.ok(isMatch, Definer.auth_err3);

      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec(); 
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;