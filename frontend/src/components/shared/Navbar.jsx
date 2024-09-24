import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/Constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (response.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-5">
                <div>
                    <h1 className="text-2xl font-bold">
                        Job <span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user?.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Company</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex gap-5">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5a30a6]">Sign Up</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h1 className="font-medium">{user?.fullName}</h1>
                                            <p className="text-sm">{user?.email}</p>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 text-gray-600 pt-2 pb-2">
                                        {user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button variant="link" onClick={handleLogout}>Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                        <ul className="flex flex-col font-medium items-center gap-5 p-5">
                            {user && user?.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Company</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )}
                        </ul>
                        {!user ? (
                            <div className="flex flex-col gap-5 p-5 items-center">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5a30a6]">Sign Up</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 p-5 items-center">
                                <Link to="/profile">
                                    <Button variant="link">View Profile</Button>
                                </Link>
                                <Button variant="link" onClick={handleLogout}>Logout</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
