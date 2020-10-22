const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');
const colors = require('colors');

dotenv.config();

connectDB();

const importData = async()=>{
    try{
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
    

     const createdUsers = await User.insertMany(users);

     const adminUser = createdUsers[0]._id;

     const samplePorducts = products.map((product)=>{
         return { ...product, user: adminUser }
     })
     
     await Product.insertMany(samplePorducts);
     console.log('data imported'.brightCyan.inverse);
     process.exit();

    }catch (error){
     console.log('data removed'.red.underline.bold);
     console.error(error.red.underline.bold);
     process.exit(1);
    }
};




const destroyData = async()=>{
    try{
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
    
     console.log('data removed'.red.underline.bold);
     process.exit();

    }catch (error){
     console.error(error);
     process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}