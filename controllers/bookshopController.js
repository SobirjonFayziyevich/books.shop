const Member = require("../models/member");
let bookshopController = module.exports;

bookshopController.getSignupMyBookshop = async (req, res) => {
    try {
        console.log("GET: cont/getSignupMyCompany");
        res.render("signup");
    } catch(err) {
        console.log(`ERROR: cont/getSignupMyBookshop, ${err.message}`);
        res.json({state: "fail", message: err.message});
    }
}

bookshopController.signupProcess = async (req, res ) => {
    try {
        console.log("POST: cont/signupproces");
        const data = req.body,
            member = new Member(),  // member service modeldan instance olinyabdi
            new_member = await member.signupData(data);   //ichida request body yuborilyabdi

        res.json({state: 'success', data: new_member});
    }
    catch(err){           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/signup, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};



bookshopController.getLoginMyBookshop = async (req, res ) => {
    try {
        console.log("GET: cont/getLoginMyBookshop");
        res.render('login-page')
    } catch(err){
        console.log(`ERROR, cont/getLoginMyBookshop, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.loginProcess = async (req, res ) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
            member = new Member(),  // member service modeldan instance olinyabdi
            new_member = await member.loginData(data);   //ichida request body yuborilyabdi

        res.json({state: 'success', data: new_member});
    }
    catch(err){           // xatoni ushlassh uchun try catch dan foydalanamiz
        console.log(`ERROR, cont/loginProcess, ${err.message}`)
        res.json({state: "fail", message: err.message});
    }
};

bookshopController.logout = (req, res ) => {
    console.log("GET cont.logout");
    res.send("logout page");
}
