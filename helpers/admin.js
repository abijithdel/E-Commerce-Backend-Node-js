const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const PostertModel = require('../models/poster')

function isAdmin(user_id){
    return new Promise( async (resolve, reject) => {
        try {
            const User = await UserModel.findById(user_id)
            if(User.admin){
                return resolve({ status:true, message:'You are Admin'})
            }
            resolve({ status:false, message:'You Are Not Admin'})
        } catch (error) {
            console.log(error)
            reject({ status:false, message:error.message})
        }
    })
}

function UploadProduct(name,price,category,description,filename){
    return new Promise( async (resolve, reject) => {
        try {
            const NewProduct = new ProductModel({
                name:name,
                price:price,
                category:category,
                description:description,
                filename:filename
            })
            await NewProduct.save()
            resolve({status:true,message:'Upload New Product Successfully'})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

function CreatePoster(title,img_name){
    return new Promise( async (resolve, reject) => {
        try {
            const NewPoster = new PostertModel({
                title:title,
                img:img_name
            })
            await NewPoster.save()
            resolve({status:true,message:'Successfully Upload Poster'})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

function GetAllPosters(){
    return new Promise( async (resolve, reject) => {
        try {
            const Posters = await PostertModel.find()
            resolve({status:true,posters:Posters})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

function GetAllProducts(){
    let Products = []
    return new Promise( async (resolve, reject) => {
        try {
            const ProductsArray = await ProductModel.find()
            for(let x=0;x<ProductsArray.length;x++){
                let item = ProductsArray[x]
                item.description = item.description.slice(0,55)
                item.name = item.name.slice(0,14)
                Products.push(item)
            }
            resolve({status:true,Products})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

function GetSpecial(){
    let special = []
    return new Promise( async (resolve, reject) => {
        try {
            const products = await ProductModel.find()
            const ProductLength = products.length
            for(let x=0;x<2;x++){
                const randomInteger = Math.floor(Math.random() * ProductLength)
                let item = products[randomInteger]
                item.description = item.description.slice(0,55)
                item.name = item.name.slice(0,7)
                special.push(item)
            }
            resolve({status:true,special})
        } catch (error) {
            console.log(error)
            reject({status:false,message:error.message})
        }
    })
}

module.exports = { isAdmin, UploadProduct, CreatePoster, GetAllPosters, GetAllProducts, GetSpecial }