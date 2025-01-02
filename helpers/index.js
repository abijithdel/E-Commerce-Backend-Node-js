const ProductModel = require("../models/product");
const CartModel = require("../models/cart");
const AddressModel = require("../models/address");
const OrderModel = require("../models/orders");

function OneProduct(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const Product = await ProductModel.findById(id);
            if (!Product) {
                return resolve({ status: false, message: "Product Not Found" });
            }
            resolve({ status: true, Product });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function AddtoCart(product_id, user_id) {
    let IntheDB;
    return new Promise(async (resolve, reject) => {
        try {
            const Cart = await CartModel.findOne({ user_id: user_id });

            if (!Cart) {
                const NewCart = new CartModel({
                    user_id,
                    product_ids: [{ id: product_id }],
                });
                await NewCart.save();
                return resolve({ status: true, message: "Successfully Added to Cart" });
            }

            for (let x in Cart.product_ids) {
                let pro_id = Cart.product_ids[x].id;
                if (product_id === pro_id) {
                    IntheDB = true;
                }
            }

            if (IntheDB) {
                return resolve({
                    status: false,
                    message: "The Product is Already in The Cart",
                });
            } else {
                Cart.product_ids.push({ id: product_id });
                await Cart.save();
                return resolve({ status: true, message: "Successfully Added to Cart" });
            }
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function CartItemCount(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const Cart = await CartModel.findOne({ user_id });
            if (!Cart) {
                return resolve({
                    status: false,
                    message: "Not Exist The User Cart",
                    count: 0,
                });
            }
            const leng = Cart.product_ids.length;
            resolve({
                status: true,
                message: "Successfully Fetch User Cart",
                count: leng,
            });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function CartItems(user_id) {
    let Cart = [];
    return new Promise(async (resolve, reject) => {
        try {
            const UserCart = await CartModel.findOne({ user_id });
            if (!UserCart) {
                return resolve({ status: false, message: "Empty Cart.." });
            }

            if (UserCart.product_ids.length === 0) {
                return resolve({ status: false, message: "Empty Cart.." });
            }

            for (let key in UserCart.product_ids) {
                let product_id = UserCart.product_ids[key].id;
                let item = await ProductModel.findById(product_id);
                if (item) {
                    item.name = item.name.slice(0, 7);
                    item.description = item.description.slice(0, 55);
                    Cart.push(item);
                }
            }
            resolve({ status: true, Cart });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function SaveAddress(user_id, countri, name, phone, pincode, address, state) {
    return new Promise(async (resolve, reject) => {
        try {
            const inAdress = await AddressModel.findOne({ user_id });
            if (!inAdress) {
                const NewAddress = new AddressModel({
                    user_id,
                    countri,
                    name,
                    phone,
                    pincode,
                    address,
                    state,
                });
                await NewAddress.save();
                return resolve({ status: true, message: "Successfully Save Address" });
            }

            inAdress.countri = countri;
            inAdress.name = name;
            inAdress.phone = phone;
            inAdress.pincode = pincode;
            inAdress.address = address;
            inAdress.state = state;
            await inAdress.save();
            resolve({ status: true, message: "Successfully Change Address" });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function GetAddress(user_id) {
    return new Promise(async (resolve, reject) => {
        try {
            const Address = await AddressModel.findOne({ user_id });
            if (!Address) {
                return resolve({ status: false, message: "Address Not Found" });
            }
            resolve({ status: true, Address });
        } catch (error) {
            console.log(error);
            reject({ status: false, message: error.message });
        }
    });
}

function OrderCashon(user_id, price, quantity, product, address, paymethods) {
    return new Promise(async (resolve, reject) => {
        try {
            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            const formattedDate = `${day}-${month}-${year}`;
            const order = new OrderModel({
                user_id,
                amount: price,
                paymethods,
                quantity,
                address,
                product,
                order_date:formattedDate
            });
            await order.save()
            resolve({status:true,message:'Successfully Placed Order'})
        } catch (error) { 
            console.log(error)
            reject({status:false,message:error.message})
        }
    });
}

function GetOrders(user_id){
    return new Promise( async (resolve, reject) => {
        try {
            const orders = await OrderModel.find({ user_id })
            if(orders.length === 0){
                return resolve({status:false,message:'No Orders!'})
            }
            resolve({status:true,orders})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

module.exports = {
    OneProduct,
    AddtoCart,
    CartItemCount,
    CartItems,
    SaveAddress,
    GetAddress,
    OrderCashon,
    GetOrders,
};
