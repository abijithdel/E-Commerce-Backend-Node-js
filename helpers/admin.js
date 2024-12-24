const UserModel = require('../models/user')

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

module.exports = { isAdmin }