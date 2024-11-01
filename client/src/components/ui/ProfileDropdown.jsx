// profileDropdown component

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { User, LogOut } from 'lucide-react';
// import avatar from '../../assets/avatar.png';



const ProfileDropdown = ({ user, onClose }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                <div className='flex gap-2 items-center'>


                    <div className='block text-sm truncate text-center'>@{user.userName}</div>
                </div>
                <div className="block text-sm truncate">{user.email}</div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
                <Link to={'/dashboard?tab=profile'} onClick={onClose} className="flex items-center px-4 py-2 text-md text-gray-700 leading-none dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </Link>

                <Link to="#" onClick={onClose} className="flex items-center px-4 py-2 text-sm text-blue-700 leading-none dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Link>
            </div>
        </div>
    );
};

ProfileDropdown.propTypes = {
    user: PropTypes.shape({
        // avatar: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProfileDropdown;
