import { setCompanies } from '@/redux/companySlice'
import { setAllAdminJobs } from '@/redux/jobSlice'
import {  JOB_API_END_POINT } from '@/utils/Constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobs()
    },[])
}

export default useGetAllAdminJobs