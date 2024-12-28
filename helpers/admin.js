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

module.exports = { isAdmin, UploadProduct, CreatePoster, GetAllPosters }