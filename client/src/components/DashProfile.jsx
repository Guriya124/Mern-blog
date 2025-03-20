import { useSelector } from "react-redux";
import avatar from '../assets/avatar.png';
import { useState, useEffect, useRef, } from "react";

export default function DashProfile() {
    const CurrentUser = useSelector(state => state.user.CurrentUser.user);
    // Log the currentUser to verify the data
    console.log(CurrentUser);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [userName, setUserName] = useState(CurrentUser.userName);
    const [email, setEmail] = useState(CurrentUser.email);
    const filePickerRef = useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }

    };
    useEffect(() => {
        if (CurrentUser) {
            setUserName(CurrentUser.userName);
            setEmail(CurrentUser.email);
        }
    }, [CurrentUser]);
    // console.log(CurrentUser);

    return (
        <div className="max-w-md  mx-auto  w-full ">
            <h1 className="my-4 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    className="hidden"
                />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                    <img
                        src={imageFileUrl || CurrentUser.profilePic || avatar}
                        alt="user"
                        className="w-full h-full  rounded-full border-8 border-[lightgray]"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = avatar;
                        }}
                        loading="lazy"
                    />
                </div>
                {/* UserName */}
                <div>
                    <label className="mt-5 text-gray-900 dark:text-gray-100 ">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black dark:bg-gray-700 dark:text-gray-100"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}

                    />
                </div>
                {/* Email */}
                <div>
                    <label className="mt-5 text-gray-900 dark:text-gray-100  ">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 mt-1 border border-gray-300  rounded-md text-black dark:bg-gray-700 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                {/* Password */}
                <div>
                    <label className="mt-5 text-gray-900 dark:text-gray-100 ">Password</label>
                    <input
                        type="password"
                        defaultValue="***************"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black dark:bg-gray-700 dark:text-gray-100" />

                </div>
                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2 mt-5 text-white font-semibold bg-gradient-to-r from-purple-400 to-blue-500 rounded-md">
                    Update
                </button>
            </form>

            <div className="flex justify-between p-3">
                <div className="w-full text-red-500 font-semibold">
                    Delete Account
                </div>
                <div className="w-full  text-red-500 font-semibold text-end">
                    Sign Out
                </div>
            </div>

        </div>
    );
}
