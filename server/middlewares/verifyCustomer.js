
const verifyCustomer= (req,res,next)=>{
    try{

        if(req.user.role!=="Customer"){
            return res.status(401).json({
                success:false,
                message:"for Customer only"
            })
        }

        next();

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Customer verification incomplete"
        })
    }
}
module.exports=verifyCustomer;
