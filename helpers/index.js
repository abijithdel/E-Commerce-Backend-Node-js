const ProductModel = require('../models/product')
const CartModel = require('../models/cart')

function OneProduct(id){
    return new Promise( async (resolve, reject) => {
        try {
            const Product = await ProductModel.findById(id)
            if(!Product){
                return resolve({status:false,message:'Product Not Found'})
            }
            resolve({status:true,Product})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

function AddtoCart(product_id,user_id){
    let IntheDB
    return new Promise( async (resolve, reject) => {
        try {
            const Cart = await CartModel.findOne({ user_id:user_id })

            if(!Cart){
                const NewCart = new CartModel({
                    user_id,
                    product_ids: [{id:product_id}]
                })
                await NewCart.save()
                return resolve({status:true,message:'Successfully Added to Cart'})
            }

            for(let x in Cart.product_ids){
                let pro_id = Cart.product_ids[x].id;
                if(product_id === pro_id){
                    IntheDB = true
                }
            }

            if(IntheDB){
                return resolve({status:false,message:'The Product is Already in The Cart'})
            }else{
                Cart.product_ids.push({id:product_id})
                await Cart.save()
                return resolve({status:true,message:'Successfully Added to Cart'})
            }


        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

module.exports = { OneProduct, AddtoCart }