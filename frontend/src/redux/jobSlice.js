import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        allAppliedJobs:[],
        searchJobByText:"",
        searchQuerry:""
        
    },
    reducers:{
        setAllJobs:(state, action)=> {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) =>{
            state.singleJob = action.payload
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload
        },
        setSearchJobQuerry:(state,action) => {
            state.searchQuerry = action.payload
        }
    }
})
export const {setAllJobs,setSingleJob,setSearchJobQuerry,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs} = jobSlice.actions
export default jobSlice.reducer;