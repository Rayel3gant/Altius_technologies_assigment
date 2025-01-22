const User = require("../models/User");
const { resErrorCode, resBadRequest, resStatusData, resStatusDataToken } = require("../response/Response")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (typeof(password) !== "string") {
        throw new Error("Password must be a string.");
    }
    return password.length >= 8;
}

const signup=async(req,res)=>{
    try{
        const { name , email , password , role } =req.body;

        if(!name || !email || !password){
            return resBadRequest(res,false,'Parameters missing')
        }

        if(! validateEmail(email)){
            return resBadRequest(res,false,'Invalid email')
        }

        if(!validatePassword(password)){
            return resBadRequest(res,false,'Invalid password')
        }

        //check if user exists
        const userData=await User.findOne({
            email:email
        })

        if(userData){
            return resBadRequest(res,false,'User exists!!!')
        }

        //hash the password
        const encryptionRounds=10;
        const hashedPassword =await bcrypt.hash(password,encryptionRounds);

        const newUser=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            role:(role) ? role : "Customer"
        })
        resStatusData(res,true,'User signed up',newUser)
    } catch(error){
        console.log(error)
        console.log("error in sign up process")
        resErrorCode(res,false,'error in sign up process')
    }
}

const login=async(req,res)=>{
    try{
        const { email , password } =req.body;

        if(!email || !password){
            return resBadRequest(res,false,'Parameters missing')
        }

        if(! validateEmail(email)){
            return resBadRequest(res,false,'Invalid email')
        }

        const userData=await User.findOne({
            email:email
        })

        if(! userData){
            return resBadRequest(res,false,'User does not exist!!')
        }

        if(await bcrypt.compare(password, userData.password)){
            const payload={
                email:userData.email,
                id:userData._id,
                role:userData.role                          
            }
            const token =jwt.sign(payload,process.env.JWT_KEY,{
                expiresIn:"24h"
            })

            userData.token=token;
            userData.password="";

            console.log("user login successful")
            resStatusData(res,true,'login successful',userData)
        } else {
            console.log("login failed => incorrect password")
            return resBadRequest(res,false,'incorrect password')
        }

    } catch(error){
        console.log(error)
        console.log("error in login process")
        resErrorCode(res,false,'error in login process')
    }
}

module.exports = { signup , login}