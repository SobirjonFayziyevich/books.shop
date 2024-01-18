const Member = require("../models/Member");
const Definer = require("../lib/error");
const assert = require("assert");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(), 
      new_member = await member.signupData(data); 
      // console.log("result:::", new_member);
    const token = memberController.createToken(new_member); 
    res.cookie("access_token", token, {
     
      maxAge: 6 * 3600 * 1000, 
      httpOnly: false, 
    });

    res.json({ state: "success", data: new_member });
  } catch (err) {
    // xatoni ushlassh uchun try catch dan foydalanamiz
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(), // member service modeldan instance olinyabdi
      result = await member.loginData(data); //ichida request body yuborilyabdi

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout page");

  // access_token
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      my_type: result.mb_type,
    };
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2); // tokenda xatolik bulsa kursatsin
    return token; //xatolik bulmasa tokenni olsin.
  } catch (err) {
    throw err;
  }
};

