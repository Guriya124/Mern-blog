import { Square, CheckSquare } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '../components/ui/SnackBar'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";


export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
    const { loading } = useSelector((state) => state.user);;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
        // console.log(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setSnackbar({ show: true, message: 'Please fill out all the fields.', type: 'error' });
            return;
        }
        try {

            dispatch(signInStart());
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');
            setSnackbar({ show: true, message: 'Sign in successful!', type: 'success' });
        } catch (error) {
            console.error('Error:', error);
            dispatch(signInFailure(error.message));
            setSnackbar({ show: true, message: 'Sign up failed. Please try again.', type: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, show: false });
    };

    return (
        <div className="min-h-[72svh] mt-20 ">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 mt-20">
                {/* left side */}
                <div className="flex-1 text-center md:text-left">
                    <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 text-4xl font-bold dark:text-white">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Guriya&rsquo;s
                        </span>
                        {/* <span>Blog</span> */}
                    </Link>
                    <p className="text-sm mt-5 leading-relaxed text-gray-700 dark:text-gray-300">
                        Welcome back to Guriya&apos;s Blog! Sign in to access your personalized dashboard, save your favorite articles, and join the conversation with our community.

                    </p>
                </div>
                {/* right side */}
                <div className="flex-1 md:w-1/2 mt-10 md:mt-0 h-full">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-base font-semibold capitalize">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email || ''}
                                className="ring-1 ring-zinc-200 w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="text-base font-semibold capitalize">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password || ''}
                                className="ring-1 ring-zinc-200 w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                                onChange={handleChange}
                            />
                            <div className="flex items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="flex items-center text-xs leading-none "
                                >
                                    {showPassword ? <CheckSquare className='w-4 h-4' /> : <Square className='w-4 h-4' />}
                                </button>
                                <span className='text-sm'>Show Password</span>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                                disabled={formData.email && formData.password ? false : true}
                            >
                                {
                                    loading ? (
                                        <div className="flex items-center justify-center">
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white">

                                            </span>
                                            <span className="ml-2">Signing In....</span>
                                        </div>
                                    ) : 'Sign Up'
                                }
                            </button>
                        </div>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don&apos;t have an account?</span>
                        <Link to="/signup">
                            <span className="text-indigo-500">Sign up</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                show={snackbar.show}
                onClose={handleCloseSnackbar}
            />
        </div>
    );
}