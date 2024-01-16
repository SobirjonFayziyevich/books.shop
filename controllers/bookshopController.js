const Member = require("../models/member");
const assert = require("assert");
const Definer = require("../lib/error");
const Product = require("./productController");
const Book = require("../models/Book");

let bookshopController = module.exports;

bookshopController.getMybookshopProducts = async (req, res) => {
    try {
        console.log("GET: cont/getMybookshopProducts");
        // TODO get my bookshop products
        const product = new Product();
        const data = await product.getAllProductsDatabookshop(res.locals.member)

        res.render("book-menu",{bookshop_data: data});
    } catch(err) {
        console.log(`ERROR: cont/getMybookshopProducts, ${err.message}`);
        res.redirect("/resto");
        res.json({state: "fail", message: err.message});
    }
}

// getSignupMyBookshop Process:
bookshopController.getSignupMyBookshop = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyBookshop");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR: cont/getSignupMyBookshop, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// Signup Process;
bookshopController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "BOOKSHOP";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
// getLoginMyBook Process
bookshopController.getLoginMyBookshop = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyBookshop");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyBookshop, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// login Process;
bookshopController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(), // member service modeldan instance olinyabdi
      new_member = await member.loginData(data); //ichida request body yuborilyabdi

        // SESSION AUTHENTICATION
    req.session.member = result;
    req.session.save(() => {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-book")
        : res.redirect("/resto/products/menu");
    });
} catch (err) {
    res.json({ state: "success", data: new_member });
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

bookshopController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR,cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

bookshopController.validateAuthbookshop = (req, res, next) => {
  if (req.session?.member?.mb_type === "BOOKSHOP") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

bookshopController.checkSession = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You aren't authenticated" });
  }
};
