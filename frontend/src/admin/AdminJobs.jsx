import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/components/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/components/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

function AdminJobs() {
    useGetAllAdminJobs()
    const navigate = useNavigate()
    const [searchInput,setSearchInput] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setSearchJobByText(searchInput))
    },[searchInput])
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input className = 'w-fit' placeholder='filter by name,role' onChange={(e)=>setSearchInput(e.target.value)}/>
                <Button onClick={()=>navigate('/admin/jobs/create')}>Add New Job</Button>
            </div>
            <AdminJobsTable />
        </div>
    </div>
  )
}

export default AdminJobs