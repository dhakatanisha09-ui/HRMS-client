import React from 'react'

import { Navigate } from 'react-router-dom'

export default function RequireAuth({children}){

    let token= localStorage.getItem("auth_token");

    if(!token){
        return <>
        <Navigate to ="/" replace/>
        
        </>
        }
    
        return children;


    
}