// OAuth component for Google Sign In
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch(); // Redux dispatch
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      console.log("Attempting to sign in...");
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
        }),

      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }




    } catch (error) {
      console.error(error)

    }
  }

  return (
    <button type="button" className='text-white text-sm md:text-base font-semibold md:py-2 py-1 md:px-4 px-2 rounded-md bg-gradient-to-r from-indigo-400 to-blue-500' onClick={handleGoogleClick}>
      <GoogleIcon className='w-4 h-4 mr-2 ' />
      <span className='text-sm leading-none'>
        Sign in with Google
      </span>

    </button>
  )
}
