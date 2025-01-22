const BASE_URL =process.env.REACT_APP_BASE_URL


const endpoints={
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    CREATE_TICKET_API : BASE_URL + "/createTicket",
    GET_ALL_CUSTOMERS_TICKET_API : BASE_URL + "/getAllCustomerTickets",
    GET_ALL_TICKETS_API : BASE_URL + "/getAllTickets",
    UPDATE_TICKET_BY_CUSTOMER_API : BASE_URL +"/updateTicketByCustomer",
    UPDATE_TICKET_BY_AGENT_API :BASE_URL + "/updateTicketByAgent",
    UPDATE_TICKET_BY_ADMIN_API : BASE_URL + "/updateTicketByAdmin",
    DELETE_PROFILE_API : BASE_URL + "/deleteProfile",
    CREATE_NEW_PROFILE_API : BASE_URL + "/createNewProfile",
    GET_ALL_PROFILES_API : BASE_URL + "/getAllProfiles",
    DELETE_NOTE_API : BASE_URL + "/deleteNote"
}


export default endpoints