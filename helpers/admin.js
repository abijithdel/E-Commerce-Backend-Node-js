const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const PostertModel = require("../models/poster");
const OrderModel = require("../models/orders");

function isAdmin(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = await UserModel.findById(user_id);
            if (User.admin) {
                return resolve({ status: true, message: "You are Admin" });
            }
            resolve({ status: false, message: "You Are Not Admin" });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function UploadProduct(name, price, category, description, filename) {
    return new Promise(async (resolve, reject) => {
        try {
            const NewProduct = new ProductModel({
                name: name,
                price: price,
                category: category,
                description: description,
                filename: filename,
            });
            await NewProduct.save();
            resolve({ status: true, message: "Upload New Product Successfully" });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function CreatePoster(title, img_name) {
    return new Promise(async (resolve, reject) => {
        try {
            const NewPoster = new PostertModel({
                title: title,
                img: img_name,
            });
            await NewPoster.save();
            resolve({ status: true, message: "Successfully Upload Poster" });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function GetAllPosters() {
    return new Promise(async (resolve, reject) => {
        try {
            const Posters = await PostertModel.find();
            resolve({ status: true, posters: Posters });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function GetAllProducts() {
    let Products = [];
    return new Promise(async (resolve, reject) => {
        try {
            const ProductsArray = await ProductModel.find();
            for (let x = 0; x < ProductsArray.length; x++) {
                let item = ProductsArray[x];
                item.description = item.description.slice(0, 55);
                item.name = item.name.slice(0, 14);
                Products.push(item);
            }
            resolve({ status: true, Products });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function GetSpecial() {
    let special = [];
    return new Promise(async (resolve, reject) => {
        try {
            const products = await ProductModel.find();
            const ProductLength = products.length;
            for (let x = 0; x < 2; x++) {
                const randomInteger = Math.floor(Math.random() * ProductLength);
                let item = products[randomInteger];
                item.description = item.description.slice(0, 55);
                item.name = item.name.slice(0, 7);
                special.push(item);
            }
            resolve({ status: true, special });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function GetAllUser(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findById(user_id);
            if (user.admin) {
                const users = await UserModel.find();
                return resolve({ status: true, users });
            } else {
                return resolve({
                    status: false,
                    message: "No permission, You Are Not Admin.!!!",
                });
            }
        } catch (error) {
            reject({ status: false, message: error.message });
        }
    });
}

function GetOrders() {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await OrderModel.find();
            resolve({ status: true, orders });
        } catch (error) {
            reject({ status: false, message: error.message });
        }
    });
}

function CancelOrder(order_id, status) {
    let out = null;
    return new Promise(async (resolve, reject) => {
        try {
            const order = await OrderModel.findById(order_id);
            if (status === "Cancel") {
                order.status = "Order Cancelled";
                out = "Cancelled";
            } else if (status === "Ship") {
                order.status = "Order Shipped";
                out = "Shipped";
            } else if (status === "Delivered") {
                order.status = "Order Delivered";
                out = "Delivered";
            } else {
                return resolve({ status: false, message: "unknown status" });
            }
            order.save();
            resolve({ status: true, message: `Order Successfully ${out}` });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function DeleteProduct(product_id, user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findById(user_id);
            if (!user.email) {
                return resolve({ status: false, message: "invalid user id" });
            }
            if (!user.admin) {
                return resolve({ status: false, message: "No permission" });
            }
            await ProductModel.findByIdAndDelete(product_id);
            resolve({ status: true, message: "Successfully Delete Product" });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function EditProduct(name, price, category, description, filename, product_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const Product = await ProductModel.findById(product_id);
            if (!Product.name) {
                return resolve({ status: false, message: "Product Not Found" });
            }
            if (filename) {
                Product.filename = filename;
            }
            if (!name && price && category && description) {
                return resolve({ status: false, message: "Enter All Fields" });
            }
            Product.name = name;
            Product.price = price;
            Product.category = category;
            Product.description = description;
            Product.save()
            resolve({status:true,message:'Successfully Updated Product'})
        } catch (error) { 
            console.log(error)
            reject({status:false,message:error.message})
        }
    });
}

function DeleteUser(user_id){
    return new Promise( async (resolve, reject) => {
        try {
            await UserModel.findByIdAndDelete(user_id)
            resolve({status:true,message:'User Successfully Deleted'})
        } catch (error) {
            reject({status:false,message:error.message})
        }
    })
}

function DeletePoster(poster_id){
    return new Promise( async (resolve, reject) => {
        try {
            await PostertModel.findByIdAndDelete(poster_id)
            resolve({status:true,message:'Delete Poster Successfully'})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

module.exports = {
    isAdmin,
    UploadProduct,
    CreatePoster,
    GetAllPosters,
    GetAllProducts,
    GetSpecial,
    GetAllUser,
    GetOrders,
    CancelOrder,
    DeleteProduct,
    EditProduct,
    DeleteUser,
    DeletePoster
};
