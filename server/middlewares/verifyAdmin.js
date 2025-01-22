
const verifyAdmin= (req,res,next)=>{
    try{

        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"for Admin only"
            })
        }

        next();

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Admin verification incomplete"
        })
    }
}
module.exports=verifyAdmin;
