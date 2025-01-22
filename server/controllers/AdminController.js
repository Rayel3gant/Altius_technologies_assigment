const Note = require("../models/Note");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { resErrorCode, resBadRequest, resStatus, resStatusData } = require("../response/Response")
const bcrypt=require("bcrypt")

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (typeof password !== "string") {
        throw new Error("Password must be a string.");
    }
    return password.length >= 8;
}
const deleteProfile=async(req,res)=>{
    try{
        const { profileId } =req.body;
        if(!profileId){
            return resBadRequest(res,false,'profile Id missing')
        }

        const userData=await User.findById(profileId)
        if(!userData){
            return resBadRequest(res,false,'Invalid profile Id')
        }

        await User.findByIdAndDelete(profileId)

        resStatus(res,true,'Profile deleted')

    } catch(error){
        console.log(error)
        console.log("error in deleting profile")
        resErrorCode(res,false,'error in deleting profile')
    }
}

const createNewProfile=async(req,res)=>{
    try{
        const { name , email , password , role} =req.body;

        if(!name || !email || !password || !role){
            return resBadRequest(res,false,'Parameters missing')
        }

        if(! validateEmail(email)){
            return resBadRequest(res,false,'Invalid email')
        }

        if(! validatePassword(password)){
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

        const newProfile=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })
        resStatusData(res,true,'New profile created ',newProfile)

    } catch(error){
        console.log(error)
        console.log("error in creating new profile")
        resErrorCode(res,false,'error in creating new profile')
    }
}


const getAllProfiles=async(req,res)=>{
    try{

        const allProfile = await User.find({
            role: { $in: ["Customer", "Agent"] }
        });

        resStatusData(res,true,'all profiles',allProfile)
    } catch(error){
        console.log(error)
        console.log("error in getting all profiles list")
        resErrorCode(res,false,'error in getting all profiles list')
    }
}

const deleteNote=async(req,res)=>{
    try{
        const { noteId , ticketId }=req.body;
        if(!noteId || !ticketId){
            return resBadRequest(res,false,'parameters missing')
        }

        await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $pull:{
                    notes:noteId
                },
                lastUpdated:Date.now()
            },
            {new:true}
        )
        await Note.findByIdAndDelete(noteId)
        resStatusData(res,true,'Note deleted')
    } catch(error){
        console.log(error)
        console.log("Error in deleting note")
        resErrorCode(res,false,'Error in deleting note')
    }
}

module.exports={ deleteProfile , createNewProfile , getAllProfiles , deleteNote }