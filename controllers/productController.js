const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/error");



let productController = module.exports;

productController.getAllProducts = async (req, res) => {
    try {
        console.log("POST: cont/getAllProducts");
        const product = new Product();
        const result = await product.getAllProductsData(req.member, req.body);
        res.json({state: "success", data: result});
    } catch (err) {
        console.log(`ERROR, cont/getAllProducts, $(err.message)`);
        res.json({state: "fail", message: err.message});
    }
};


productController.addNewProduct = async (req, res) => {
    try {
        console.log("POST: cont/addNewProduct");
        //TODO product creation develop

        res.send("ok")
    } catch (err) {
        console.log(`ERROR, cont/addNewProduct, $(err.message)`);
        res.json({state: "fail", message: err.message});
    }
};

productController.updateChosenProduct = async (req, res) => {
    try {
        console.log("POST: cont/updateChosenProduct");
    } catch (err) {
        console.log(`ERROR, cont/updateChosenProduct, $(err.message)`);
        res.json({state: "fail", message: err.message});
    }
} 