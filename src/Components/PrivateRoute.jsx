import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuthStatus } from '../Hooks/useAuthStatus';
const PrivateRoute = () => {
    const {loggedIn,chekingStatus} = useAuthStatus();
    if(chekingStatus){
        return <div>Loading...</div>
    }
  return loggedIn ? <Outlet /> : <Navigate to="/sign" />;
}

export default PrivateRoute