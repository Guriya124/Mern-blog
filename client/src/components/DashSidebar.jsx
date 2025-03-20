import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LogOut,  UserCircle } from 'lucide-react';
export default function DashSidebar() {



  const location = useLocation();
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search)
    const tabFromUrl = urlPrams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
      console.log(tabFromUrl)
    }
  }, [location.search])

  return (
    <aside className={`h-screen  w-full md:w-64 bg-white  dark:bg-gray-900 border-r  overflow-hidden `}>
      <nav className=' h-full flex flex-col  overflow-y-hidden '>
        <div className='flex items-center justify-between p-4'>

        </div>
        <div className='flex flex-col'>

          <Link
            to="/dashboard?tab=profile"
            className={`p-4 font-semibold text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 ${tab === 'profile' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <span className='flex gap-2 font-semibold text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'>
              <UserCircle className='w-6 h-6' />
              Profile
            </span>
          </Link>
          <div className='p-4 font-semibold  text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'>
            <span className='flex gap-2 font-semibold  text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800'>
              <LogOut className='w-6 h-6' />
              Logout
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}