import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
        {/* left side */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Guriya&rsquo;s
            </span>
            <span>Blog</span>
          </Link>
          <p className="text-sm mt-5 leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to Guriya&apos;s Blog! Discover a collection of insightful articles, tutorials,
            and stories on a variety of topics. 
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 ">
            <div className=''>
              <label htmlFor="userName" className="text-sm font-semibold capitalize ">Username</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter your username "
                className="ring-1 ring-zinc-200 w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold capitalize">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="ring-1 ring-zinc-200 w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold capitalize">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="ring-1 ring-zinc-200 w-full mt-1 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in">
              <span className="text-indigo-500">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
