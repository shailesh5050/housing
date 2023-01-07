import React,{useState,useEffect,useRef} from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
export const useAuthStatus = () => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [chekingStatus,setChekingStatus] = useState(true)
    const isMounted = useRef(true);
    useEffect(() => {
        const auth = getAuth();
        
        onAuthStateChanged(auth,(user) => {
            if(user){
                setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }
            setChekingStatus(false)
        })
        return () => {
            isMounted.current = false;
        }
    },[isMounted])
  return {loggedIn,chekingStatus}
}
