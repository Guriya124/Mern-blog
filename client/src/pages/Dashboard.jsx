import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';


export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlPrams = new URLSearchParams(location.search)
        const tabFromUrl = urlPrams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl)
       }
    }, [location.search])
    return (
        <div className='md:flex flex-1'>
            <div>
                {/* SideBar section */}
                <DashSidebar />
            </div>

            {/* Profile .......... */}
          {tab === 'profile' && <DashProfile />}
        </div>
    )
}
