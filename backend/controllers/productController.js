const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Fetch all products    
//@route  GET /api/products
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.json(products);
});


// Fetch single product  
//@route  GET /api/products/:id
 const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
       res.json(product);
    }else{
       res.status(404)
       throw new Error('Product not found')
    }
});

module.exports = { getProducts, getProductById }