import { setLoading, setTicketList, setToken, setUserData } from "../redux/slices/authSlice"
import { apiConnector } from "./apiConnector"
import endpoints from "./apis"
import {PROFILE_ROLE } from "../utils/Constant"
import { toast } from "react-toastify"
import axios from "axios"


export const signup =(data) => async(dispatch)=>{
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST",endpoints.SIGNUP_API, {
            name:data.name,
            email:data.email,
            password:data.password
        })

        console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.status) {
            toast.error(response.data.message)
            throw new Error(response.data.message)
        }
        toast.success("Sign up success")
    } catch(error){
        console.log("SIGNUP API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
    }
    dispatch(setLoading(false))
}

export const login = (data,navigate)=> async(dispatch)=>{
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST", endpoints.LOGIN_API, {
            email:data.email,
            password:data.password
        })

        console.log("LOGIN API RESPONSE............", response)

        if ( response.data.status ===false) {
            toast.error(response?.data?.message)
            throw new Error(response.data?.message)
        }
        
        dispatch(setUserData(response.data.data))
        dispatch(setToken(response.data.data.token))

        localStorage.setItem("token", JSON.stringify(response.data.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.data))

        
        toast.success("User logged in")

        console.log("moving to dashboard")
        const userRole=response.data.data.role;
        if(userRole=== PROFILE_ROLE.CUSTOMER){
            navigate("/dashboard/createTicket")
        } else if(userRole === PROFILE_ROLE.AGENT){
            navigate("/dashboard/allTickets1")
        } else{
            navigate("/dashboard/allTickets2")
        }

    } catch(error){
        console.log("LOGIN API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }

    }
    dispatch(setLoading(false))
}



export const logout = (navigate) => async (dispatch) => {
    try {
        // Clear the token and user data from state
        dispatch(setToken(null));
        dispatch(setUserData(null));

        // Remove items from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("User logged out")
        console.log("User logged out");

        // Navigate to the login page or home
        navigate("/");


    } catch (error) {
        console.error("Error during logout:", error);
    }
};

export const createNewTicket=(data , token)=>async(dispatch)=>{

    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", endpoints.CREATE_TICKET_API, {
                title:data.title  , 
                description: data.description , 
                name:data.name
            }, 
            {
                Authorization: `Bearer ${token}`,
            }
        )

        toast.success("ticket cretaed")
        console.log("CREATE TICKET API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Create ticket")
        }



    } catch(error){
        console.log("LOGIN API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
    }
    dispatch(setLoading(false))
}


export const getAllCustomerTickets = async( token, dispatch) => {
    dispatch(setLoading(true))

    let result = []
    try {
        const response = await apiConnector("GET", endpoints.GET_ALL_CUSTOMERS_TICKET_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_CUSTOMER_TICKETS API RESPONSE............", response)
  
      if (!response.data.status) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_CUSTOMER_TICKETS API ERROR............", error)
      result = error.response.data
    }
    dispatch(setLoading(false));
    return result
}

export const updateTicket =async(data , token , role , dispatch)=>{
    dispatch(setLoading(true))
    let apiUrl;
    if(role===PROFILE_ROLE.ADMIN){
        apiUrl=endpoints.UPDATE_TICKET_BY_ADMIN_API
    } else if(role===PROFILE_ROLE.CUSTOMER){
        apiUrl= endpoints.UPDATE_TICKET_BY_CUSTOMER_API
    } else { 
        apiUrl = endpoints.UPDATE_TICKET_BY_AGENT_API
    }
    console.log(data)
    try{
        const response = await apiConnector("POST",apiUrl, {
            ticketId:data.ticketId , 
            noteDesc:data?.noteDesc , 
            status:data?.status , 
            noteId:data?.noteId , 
            name:data?.name
        }, 
        {
            Authorization: `Bearer ${token}`,
        }
    )
      console.log("UPDATE TICKET API RESPONSE............", response)
    } catch(error){
        console.log("UPDATE TICKET API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }

    }
    dispatch(setLoading(false))
}

export const getAllTickets=async(token , dispatch)=>{
    dispatch(setLoading(true))

    let result = []
    try {
        const response = await apiConnector("GET", endpoints.GET_ALL_TICKETS_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_TICKETS API RESPONSE............", response)
  
      if (!response.data.status) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_TICKETS_API  ERROR............", error)
      result = error.response.data
    }
    dispatch(setLoading(false));
    return result
}

export const createNewProfile =async(data , token , dispatch)=>{
    console.log(data)
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST",endpoints.CREATE_NEW_PROFILE_API, {
            name:data.name , 
            email:data.email , 
            password:data.password , 
            role:data.role
        }, 
        {
            Authorization: `Bearer ${token}`,
        })

      console.log("CREATE PROFILE API RESPONSE............", response)
        toast.success("profile created")

    } catch(error){
        console.log("CREATE PROFILE API ERROR............", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
    } 
    dispatch(setLoading(false))
}

export const deleteProfile=async(profileId , token , dispatch )=>{
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST",endpoints.DELETE_PROFILE_API, {
            profileId:profileId
        }, 
        {
            Authorization: `Bearer ${token}`,
        })
        toast.success("Profile deleted")
      console.log("DELETE PROFILE API RESPONSE............", response)
    } catch(error){
        console.log("DELETE PROFILE API ERROR...........", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            if (error.response) {
                console.log('Error response data:', error.response.data); // Server response
                toast.error(error.response.data.message)
            } 
        }
    }
    dispatch(setLoading(false))
}

export const getAllProfiles =async(token, dispatch) => {
    dispatch(setLoading(true))

    let result = []
    try {
        const response = await apiConnector("GET", endpoints.GET_ALL_PROFILES_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_ALL_PROFILES API RESPONSE............", response)
  
      if (!response.data.status) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_PROFILES API ERROR............", error)
      result = error.response.data
    }
    dispatch(setLoading(false));
    return result
}

export const deleteNote =async(data, token , dispatch)=>{
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST",endpoints.DELETE_NOTE_API, {
            noteId:data.noteId , 
            ticketId:data.ticketId
        }, 
        {
            Authorization: `Bearer ${token}`,
        })
        toast.success("note deleted")
      console.log("DELETE PROFILE API RESPONSE............", response)
    } catch(error){
      console.log("DELETE_NOTE API ERROR............", error)
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        if (error.response) {
            console.log('Error response data:', error.response.data); // Server response
            toast.error(error.response.data.message)
        } 
    }

    }
    dispatch(setLoading(false))
}