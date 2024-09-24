import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobQuerry } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchJobQuerry(query));
        navigate("/browse");
    };

    return (
        <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="flex flex-col gap-5 my-10">
                <motion.span
                    className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    No. 1 Job Hunt Website
                </motion.span>
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
                </motion.h1>
                <motion.p
                    className="text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                >
                            Discover a world of opportunities at your fingertips. Our platform connects you with top employers and offers a seamless application process tailored just for you. Whether you're seeking a fresh start or looking to advance your career, we provide the tools and resources you need to succeed. Join us today and take the first step towards your future!
                </motion.p>
                <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full py-2"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
