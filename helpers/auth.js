const bcrypt = require('bcrypt');
const UserModel = require('../models/user')

function Signup(email, password, cpassword) {
    let hashpass
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOne({ email: email })
            if (user){
                return resolve({status:false,message:`User Already Exists With This Email: ${email}`})
            }

            if(password !== cpassword){
                return resolve({status:false,message:`Check Confirm Password: ${cpassword}`})
            }

            bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    return resolve({ status:false,message:'Server Error'})
                }else{
                    hashpass = hash
                }
            })

            const NewUser = new UserModel({
                email:email,
                password:hashpass
            })
            await NewUser.save()
            resolve({ status:true, message: 'Successfully Created Account', NewUser})
        } catch (error) {
            console.log(error)
            reject({message:"Server Error",error:error.message})
        }
    })
}

module.exports = { Signup }