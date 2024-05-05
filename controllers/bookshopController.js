const Product = require("../models/Product");
const Member = require("../models/Member");
const Book = require("../models/Book")
const Definer = require("../lib/error");
const assert = require("assert");

const bookshopController = module.exports;

bookshopController.getBookshop = async (req, res) => {
    try {
        console.log("GET: cont/getBookshop");
        const data = req.query;
        const book = new Book();

        result = await book.getBookshopData(req.member, data);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getBookshop, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.getChosenBookshop = async (req, res) => {
    try {
        console.log("GET: cont/getChosenBookshop");
        const id = req.params.id;
        const book = new Book();

        result = await book.getChosenBookshopData(req.member, id);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getChosenBookshop, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}

/**********************************
 *    Company related methods   *
 **********************************/


 bookshopController.home = (req, res) => {
    try {
        console.log("GET: cont/home");
        res.render('homepage');
    } catch (err) {
        console.log(`ERROR: cont/home, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.getMybookshopProducts = async (req, res) => {
    try {
        console.log("GET: cont/getMybookshopProducts");
        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);
        res.render("book-menu", { book_data: data });
    } catch (err) {
        console.log(`ERROR: cont/getMybookshopProducts, ${err.message}`);
        res.redirect("/resto");
    }
}

bookshopController.getSignupMyBookshop = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyBookshop");
         res.render("signup");
    } catch (err) {
        console.log(`ERROR: cont/getSignupMyBookshop, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};
bookshopController.signupProcess = async (req, res) => {
    try {
      console.log("POST: cont/signupProcess");
      assert(req.file, Definer.general_err3);
  
      console.log("body:", req.body);
      console.log("file:", req.file);
      assert(req.file, Definer.general_err3);
      res.send("success");
  
      let new_member = req.body;
      new_member.mb_type = "BOOKSHOP"; // ADMINKA un kerak malumot.
      new_member.mb_image = req.file.path; //yuklangan image ni  kiritayopmiz.
  
      const member = new Member(); //ichida request body yuborilyabdi.//
      const result = await member.signupData(new_member);
      assert(result, Definer.general_err1);
  
      req.session.member = result;
      res.redirect("/resto/products/menu");
    } catch (err) {
      console.log(`ERROR, cont/signupProcess, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  };


bookshopController.getLoginMyBookshop = async (req, res) => {
    try {
        console.log("GET: cont/getLoginMyBookshop");
        res.render('loginpage')
    } catch (err) {
        console.log(`ERROR, cont/getLoginMyBookshop, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/loginProcess");
        const data = req.body,
            member = new Member();
        result = await member.loginData(data);

        req.session.member = result;
        req.session.save(function () {
            result.mb_type === "ADMIN"
                ? res.redirect("/resto/all-book")
                : res.redirect("/resto/products/menu");
        });
    } catch (err) {
        console.log(`ERROR, cont/loginProcess, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.logout = (req, res) => {
    try {
        console.log("GET cont/logout");
        req.session.destroy(function () {
            res.redirect("/resto");
        });
    } catch (err) {
        console.log(`ERROR, cont/logout, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.validateAuthbookshop = (req, res, next) => { 
    if (req.session?.member?.mb_type === "BOOKSHOP") {
        req.member = req.session.member;
        next();
    } else res.json({state: "fail", message: "only authenticated members with bookshop type"})
};

bookshopController.checkSessions = (req, res) => {
    if (req.session?.member) {
        res.json({state: 'success', data: req.session.member});
    } else {
        res.json({state: "fail", message: "You aren't authenticated"});
    }
};

bookshopController.validateAdmin = (req, res, next) => { // faqat ADMIN user 
    if (req.session?.member?.mb_type === "ADMIN") {
        req.member = req.session.member;
        next();
    } else {
        const html = `<script>
                      alert("Admin page: Permission denied!");
                      window.location.replace("/resto");
                      </script>`
        res.end(html);
    }
};



bookshopController.getAllBookshop = async (req, res) => {
    try {
        console.log("GET cont/getAllBookshop");
        // TODO: call AllBookshop from DataBase:
        const book = new Book();
        const book_data = await book.getAllBookshopData();
        res.render("all-book", {book_data: book_data});

    } catch (err) {
        console.log(`ERROR, cont/getAllBookshop, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}


bookshopController.updateBookshopByAdmin = async (req, res) => {
    try {
        console.log("GET cont/updateBookshopByAdmin");

        const book = new Book();
        const result = await book.updateBookshopByAdminData(req.body);  // body qismdan datani oladi
        await res.json({state: "success", data: result});  // natija success bolsa res.json ko'rinishda front-ent ga  ma'lumot yuboryabdi
    } catch (err) {
        console.log(`ERROR, cont/updateBookshopByAdmin, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}
