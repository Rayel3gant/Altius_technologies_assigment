const mongoose=require("mongoose")

const ticketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["Active","Pending","Closed"],
        default:"Active"
    },
    customerId:{   // who created the ticket
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true  
    },
    lastUpdated:{
        type:Date,
        default:null
    },
    notes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Note",
            default:null
        }
    ]
})

module.exports=mongoose.model("Ticket",ticketSchema)