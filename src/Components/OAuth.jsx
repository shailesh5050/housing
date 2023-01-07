import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { signInWithPopup,getAuth,GoogleAuthProvider } from 'firebase/auth'
import { toast } from 'react-toastify'
import { doc,setDoc,getDoc,serverTimestamp } from 'firebase/firestore'
import googleIcon from '../assets/svg/googleIcon.svg'
import { db } from '../FireBaseConfig'
const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onGoogleClick = async () => {
        try{
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
      
            // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
      
            // If user, doesn't exist, create user
            if (!docSnap.exists()) {
              await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
              })
            }
            navigate('/')
        }catch(error){
            console.log("Error",error);
            toast.error("Not Authorized");
        }
    }
    
  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname=='/sign' ? 'In' : 'Up'} With</p>
        <buttton onClick={onGoogleClick} className='socialIconDiv'>
            <img src={googleIcon} alt="googleIcon" className="socialIconImg" />
        </buttton>
    </div>
  )
}

export default OAuth