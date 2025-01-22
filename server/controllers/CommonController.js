const Note = require("../models/Note");
const Ticket = require("../models/Ticket");
const { resStatusData, resErrorCode, resBadRequest } = require("../response/Response");


const getAllTickets=async(req,res)=>{
    try{
        const ticketsData = await Ticket.find({})
        .sort({ lastUpdated: -1 }) 
        .populate([
            {
                path: "customerId",
            },
            {
                path: "notes",
            },
        ])
        .exec();

        resStatusData(res,true,'tickets Data',ticketsData)
    } catch(error){
        console.log(error)
        console.log("error in getting tickets list")
        resErrorCode(res,false,'error in getting tickets list')
    }
}


const updateTicket=async(req,res)=>{
    try{
        const { ticketId , noteDesc , status , noteId , name} =req.body;
        if(!ticketId  ){
            return resBadRequest(res,false,'ticket Id missing')
        }
        if (!noteDesc && !status){
            return resBadRequest(res,false,'No data to update')
        }
        const ticketData=await Ticket.findById(ticketId)
        if(! ticketData){
            return resBadRequest(res,false,'Invalid ticket Id')
        }

        let updatedTicket;
        if(status && req.user.role !== "Customer"){  //customer can not update ticket status 
            // only update status
            updatedTicket=await Ticket.findByIdAndUpdate(ticketId,{
                status:status,
            },{new:true})
        }

        if(noteDesc){
            if(noteId){
                // update note and lastUpdated
                await Note.findByIdAndUpdate(noteId,{
                    description:noteDesc
                },{new:true})

                updatedTicket=await Ticket.findByIdAndUpdate(ticketId,{
                    lastUpdated:Date.now()
                },{new:true})

            } else {
                // create new note 
                const newNote=await Note.create({
                    name:name,
                    description:noteDesc
                })

                updatedTicket=await Ticket.findByIdAndUpdate(ticketId,{                    
                    $push:{
                        notes:newNote._id
                    },                    
                    lastUpdated:Date.now()
                },{new:true})
            }
        }

        resStatusData(res,true,'ticket updated',updatedTicket)


    } catch(error){
        console.log(error)
        console.log("error in updating ticket")
        resErrorCode(res,false,'error in updating ticket')
    }
}



module.exports={getAllTickets, updateTicket }

