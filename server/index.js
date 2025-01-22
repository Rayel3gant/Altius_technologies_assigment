const express=require("express")
const app=express()
require("dotenv").config()

const routes=require("./routes/route")
const cors=require("cors")
const dbConnection = require("./config/dbConnection")
app.use(express.json());

app.use(cors({
    origin:"*",     
    credentials:true, 
}))

const port =process.env.BACKEND_PORT || 3003;
app.use("/web",routes)


dbConnection()

//default route
app.get("/" ,(req,res)=>{
    return res.json({
        success:true,
        message:"server actication successful"
    })
})

app.listen(port, () =>{
    console.log("server started successfully on port ", port);
})

