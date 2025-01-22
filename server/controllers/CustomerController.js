const Note = require("../models/Note");
const Ticket = require("../models/Ticket")
const { resErrorCode, resBadRequest, resStatusData } = require("../response/Response")


const createNewTicket=async(req,res)=>{
    try{
        const userId=req.user.id;
        const { title  , description , name  } =req.body;

        if(!title){
            return resBadRequest(res,false,'ticket title missing')
        }

        const ticketData=await Ticket.findOne({
            customerId:userId,
            title:title
        })

        if(ticketData){
            return resBadRequest(res,false,'Ticket exists')
        }

        //create new ticket

        let newTicket;
        newTicket=await Ticket.create({
            title,
            status:"Active",
            lastUpdated:Date.now(),
            customerId:userId
        })

        if(description && name){
            // create new note 
            const newNote=await Note.create({
                name:name,
                description:description
            })

            newTicket=await Ticket.findByIdAndUpdate(newTicket._id,{                    
                $push:{
                    notes:newNote._id
                },                    
                lastUpdated:Date.now()
            },{new:true})
        }

        resStatusData(res,true,'ticket added', newTicket)

    } catch(error){
        console.log(error)
        console.log("error in creating new ticket")
        resErrorCode(res,false,'error in creating new ticket')
    }
}

const getAllCustomerTickets=async(req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return resBadRequest(res,false,'parameters missing')
        }
        const allTickets=await Ticket.find(
            {customerId:userId}
        ) 
        .sort({ lastUpdated: -1 }) 
        .populate("customerId").populate("notes").exec()

        resStatusData(res,true,'customer tickets',allTickets)
    } catch(error){
        console.log(error)
        console.log("error in fetching customer ticket list")
        resErrorCode(res,false,'error in fetching customer ticket list')
    }
}



module.exports = { createNewTicket , getAllCustomerTickets}