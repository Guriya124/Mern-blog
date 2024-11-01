// Nabvar component 

import { Link, useLocation } from 'react-router-dom';
import { Moon, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ui/ProfileDropdown';
import avatar from '../assets/avatar.png'

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    const { CurrentUser } = useSelector(state => state.user); // Adjusted to match the state structure

    const currentUser = CurrentUser;
    const menu = [
        { title: "Home", link: "/" },
        { title: "Projects", link: "/projects" }
    ];

    const [isOpen, setIsOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        console.log('currentUser:', currentUser);
        console.log('currentUser profilePic:', currentUser?.profilePic);
    }, [currentUser]);
    return (
        <nav className="p-3 flex items-center justify-between border-b bg-white dark:bg-gray-900 ">
            {/* Logo and Title */}
            <Link to="/" className="self-center whitespace-nowrap flex items-center space-x-2 text-sm sm:text-xl font-semibold dark:text-white">
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Guriya&rsquo;s
                </span>
                <span>Blog</span>
            </Link>

            {/* Search Form (desktop only) */}
            <form className='hidden lg:flex md:inline'>
                <div className="relative flex items-center">
                    <input type="text" className="border p-2 pr-10 rounded-lg dark:bg-gray-800 dark:text-white" placeholder="Search" />
                    <Search className="absolute right-2 text-gray-800 dark:text-white w-5 h-5" />
                </div>
            </form>

            {/* Mobile Search Button */}
            <button className='lg:hidden md:hidden w-8 h-8 border border-gray-200 flex items-center justify-center rounded-full'>
                <Search className="text-gray-800 dark:text-white w-4 h-4" />
            </button>

            {/* Collapsible Menu Items */}
            <div className={`lg:flex lg:items-center lg:space-x-6 p-4 ${isOpen ? 'block absolute top-16 right-0 bg-gray-50 border-b w-full dark:bg-gray-800 lg:static lg:top-0 lg:right-auto' : 'hidden'} lg:ml-6`}>
                <ul className="flex flex-col lg:flex-row px-2 gap-4">
                    {menu.map((item, index) => (
                        <li key={index} className={`text-md font-bold ${path === item.link ? 'text-indigo-500' : 'text-gray-800 dark:text-white'}`}>
                            <Link to={item.link} className="block hover:text-indigo-500">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side Buttons (always visible) */}
            <div className='flex items-center gap-5'>
                <button className='w-10 h-10 border border-gray-200 hidden md:flex items-center justify-center rounded-full'>
                    <Moon className="w-5 h-5 dark:text-white" />
                </button>

                {/*profile  dropdown menu */}
                {currentUser ? (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center">
                            <img
                                src={currentUser.profilePic || avatar}
                                alt="user"
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = avatar;
                                }}
                                loading="lazy"
                            />
                        </button>
                        {isDropdownOpen && (
                            <ProfileDropdown user={{

                                userName: currentUser.userName,
                                email: currentUser.email
                            }} onClose={() => setIsDropdownOpen(false)} />
                        )}


                    </div>


                ) : (
                    <Link to="/sign-in">
                        <button className='text-white text-sm md:text-base font-semibold md:py-2 py-1 md:px-4 px-2 rounded-xl bg-gradient-to-r from-purple-400 to-blue-500'>
                            Sign In
                        </button>
                    </Link>
                )

                }
                {/* {console.log(currentUser)} */}
                {console.log('ProfileDropdown user:', {
                    profilePic: currentUser?.profilePic,
                    userName: currentUser?.userName,
                    email: currentUser?.email
                })
                }
                {/* Mobile Menu Toggle Button */}
                <button className='lg:hidden border md:px-2 px-1 py-1 rounded-lg flex items-center justify-center' onClick={toggleMenu}>
                    {isOpen ? <X className="w-6 h-6 text-gray-900 font-bold dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 font-bold dark:text-white" />}
                </button>
            </div >
        </nav >
    );
}