import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  // token:null
  ticketList:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {    
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setUserData(state, value) {
      console.log("payload:",value.payload)
      state.userData = value.payload;
      console.log("sign up data setting to : ",state.userData)
    },
    setTicketList(state,value){
      state.ticketList=value.payload
    }
  },
});


export const { setUserData, setLoading, setToken ,setTicketList } = authSlice.actions;

export default authSlice.reducer;