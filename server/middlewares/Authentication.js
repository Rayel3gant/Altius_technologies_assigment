const jwt =require("jsonwebtoken");
require("dotenv").config();
const User =require("../models/User");
const { resBadRequest, resErrorCode } = require("../response/Response");

const Authentication= async(req,res,next)=>{
    try{    
        const token = req.body.token || req.header("Authorization")?.replace("Bearer ","");
        if(! token){
            return resBadRequest(res,false,'token missing')
        }

        //decode token
        try{
            const decodedData= jwt.verify(token,process.env.JWT_KEY);
            req.user=decodedData;     // we can find id ,e mail from request
        }
        catch(error){
            console.log(error);
            resErrorCode(res,false,'invalid token')
        }

        next();
       
    }
    catch(error){
        console.log(error);
        resErrorCode(res,false,'error in authentication')

    }
}
module.exports=Authentication; 