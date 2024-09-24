import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/components/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

function Companies() {
    useGetAllCompany()
    const navigate = useNavigate()
    const [searchInput,setSearchInput] = useState("")
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setSearchCompanyByText(searchInput))
    },[searchInput])
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <Input className = 'w-fit' placeholder='filter by name' onChange={(e)=>setSearchInput(e.target.value)}/>
                <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
            </div>
            <CompaniesTable />
        </div>
    </div>
  )
}

export default Companies