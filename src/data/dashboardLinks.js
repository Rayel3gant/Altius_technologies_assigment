import { PROFILE_ROLE } from "../utils/Constant";

export const sidebarLinks = [
    {
      id: 1,
      name: "Create Ticket",
      path: "/dashboard/createTicket",
      type: PROFILE_ROLE.CUSTOMER
    },
    {
      id: 2,
      name: "Tickets List",
      path: "/dashboard/ticketsList",
      type: PROFILE_ROLE.CUSTOMER,
    },
    {
      id: 3,
      name: "All Tickets",
      path: "/dashboard/allTickets1",
      type: PROFILE_ROLE.AGENT,
    },
    {
      id: 4,
      name: "All Tickets",
      path: "/dashboard/allTickets2",
      type: PROFILE_ROLE.ADMIN,
    },
    {
        id: 4,
        name: "Create profile",
        path: "/dashboard/createProfile",
        type: PROFILE_ROLE.ADMIN,
    },
    {
      id: 5,
      name: "Manage profiles",
      path: "/dashboard/manageProfiles",
      type: PROFILE_ROLE.ADMIN,
  },
    
];