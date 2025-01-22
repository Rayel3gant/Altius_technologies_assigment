const express=require("express")
const router=express.Router()


const { signup, login } = require("../controllers/AuthController")
const Authentication = require("../middlewares/Authentication")
const verifyCustomer = require("../middlewares/verifyCustomer")
const { createNewTicket, getAllCustomerTickets } = require("../controllers/CustomerController")
const { getAllTickets, updateTicket } = require("../controllers/CommonController")
const verifyAgent = require("../middlewares/verifyAgent")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { deleteProfile, createNewProfile, getAllProfiles, deleteNote } = require("../controllers/AdminController")

//auth routes
router.post("/auth/signup",signup)
router.post("/auth/login",login)

//customer routes
router.post("/createTicket",Authentication,verifyCustomer, createNewTicket)
router.get("/getAllCustomerTickets",Authentication,verifyCustomer,getAllCustomerTickets)


router.get("/getAllTickets",Authentication,getAllTickets)
router.post("/updateTicketByCustomer",Authentication,verifyCustomer,updateTicket)
router.post("/updateTicketByAgent",Authentication,verifyAgent,updateTicket)
router.post("/updateTicketByAdmin",Authentication,verifyAdmin,updateTicket)

//admin routes
router.post("/deleteProfile",Authentication,verifyAdmin,deleteProfile)
router.post("/createNewProfile",Authentication,verifyAdmin,createNewProfile)
router.get("/getAllProfiles",Authentication,verifyAdmin,getAllProfiles)
router.post("/deleteNote",Authentication,verifyAdmin,deleteNote)


module.exports=router