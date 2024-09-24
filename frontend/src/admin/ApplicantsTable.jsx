import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/Constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-x-auto"> {/* Enable horizontal scrolling */}
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-sm md:text-base">FullName</TableHead>
                        <TableHead className="text-sm md:text-base">Email</TableHead>
                        <TableHead className="text-sm md:text-base">Contact</TableHead>
                        <TableHead className="text-sm md:text-base">Resume</TableHead>
                        <TableHead className="text-sm md:text-base">Date</TableHead>
                        <TableHead className="text-sm md:text-base text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="text-sm md:text-base">{item.applicant?.fullName}</TableCell>
                                <TableCell className="text-sm md:text-base">{item.applicant?.email}</TableCell>
                                <TableCell className="text-sm md:text-base">{item.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-sm md:text-base">
                                    {
                                        item.applicant?.profile?.resume 
                                            ? <a className="text-blue-600 cursor-pointer" href={item.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item.applicant?.profile?.resumeOriginalName}</a> 
                                            : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-sm md:text-base">{item.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div onClick={() => statusHandler(status, item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
