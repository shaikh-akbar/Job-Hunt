import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto"> {/* Enable horizontal scrolling */}
            <Table>
                <TableCaption>A List Of Your Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-sm md:text-base">Logo</TableHead>
                        <TableHead className="text-sm md:text-base">Name</TableHead>
                        <TableHead className="text-sm md:text-base">Date</TableHead>
                        <TableHead className="text-sm md:text-base text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className='text-center'>
                                <span>No companies found</span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-sm md:text-base">{company.name}</TableCell>
                                <TableCell className="text-sm md:text-base">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
